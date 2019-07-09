// tslint:disable:no-string-literal
// tslint:disable:no-console
// tslint:disable:no-array-mutation
import './ThreeSence.scss';

import { Spin } from 'antd';
import differenceBy from 'lodash/differenceBy';
import * as React from 'react';

import { getUploadedFileSrc } from '@/business/uploaded-file';
import {
    FurnitureComponent,
    FurnitureMaterial,
    ProductModule
} from '@/restful';

import { ThreeSenceBase, ThreeSenceBaseProps } from './ThreeSenceBase';

const { THREE } = window;

type QueueAction = () => Promise<unknown>;

interface ThreeSenceProps extends ThreeSenceBaseProps {
    readonly setSence?: (threeSence: ThreeSence) => void;
}

export class ThreeSence extends ThreeSenceBase<ThreeSenceProps> {
    readonly state = {
        loaded: false,
        isQueueRuning: false
    };

    private _isQueueRuning = false;
    private _loaded3DComponents: Array<THREE.Group> = [];
    private _queue: Array<QueueAction> = [];

    private readonly runQueue = async () => {
        setTimeout(
            () => {
                if (!this._isQueueRuning) {
                    return;
                }

                this.setState({
                    isQueueRuning: true
                });
            },
            250
        );

        this._isQueueRuning = true;

        while (this._queue.length) {
            try {
                await this._queue[0]();
                this._queue.shift();
            } catch (error) {
                throw error;
            }
        }

        this.setState({
            isQueueRuning: false
        });
        this._isQueueRuning = false;
    }

    private readonly addToQueue = (action: QueueAction) => {
        this._queue.push(action);

        if (this._isQueueRuning) {
            return;
        }

        this.runQueue();
    }

    private readonly loadNormalMap = (material: FurnitureMaterial, meshMaterial: THREE.MeshPhongMaterial) => {
        const normalMapLoader = new THREE.TextureLoader();
        normalMapLoader.load(
            getUploadedFileSrc({
                uploadedFile: material.view_normalMap
            }),

            function (texture: THREE.Texture) {
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;

                meshMaterial['normalMap'] = texture;
                meshMaterial.needsUpdate = true;
            }
        );
    }

    private readonly initContent = () => {
        const { productModules } = this.props;
        for (const productModule of productModules) {

            if (!productModule.material || !productModule.component) {
                continue;
            }

            this.loadModule(productModule);
        }
    }

    private readonly loadModule = (productModule: ProductModule) => {
        if (productModule.component.mtl) {
            const onLoadMtl = (mtl: THREE.MaterialCreator) => {
                const textureFile = getUploadedFileSrc({
                    uploadedFile: productModule.material.texture
                });

                for (const materialInfoKey in mtl.materialsInfo) {
                    if (mtl.materialsInfo.hasOwnProperty(materialInfoKey)) {
                        const materialInfo = mtl.materialsInfo[materialInfoKey];

                        materialInfo.map_ka = textureFile;
                        materialInfo.map_kd = textureFile;
                    }
                }

                mtl.setCrossOrigin(true);
                mtl.preload();

                const materials = mtl.materials as THREE.MeshPhongMaterial[];

                for (const key in materials) {
                    if (!materials.hasOwnProperty(key)) {
                        continue;
                    }

                    const material = materials[key];

                    material.name = productModule.material.id;
                    material.transparent = true;

                    if (material.map) {
                        material.map.anisotropy = 16;
                        if (productModule.material.materialType) {
                            material.shininess = productModule.material.materialType.view_shiny || 0;
                        }
                    }

                    if (productModule.material.view_normalMap) {
                        this.loadNormalMap(productModule.material, material);
                    }
                }

                const objLoader = new THREE.OBJLoader2();
                const callbackOnLoadObj = this.createInitModulesOnLoadHandler(productModule, materials);

                objLoader.setLogging(false, false);
                objLoader.setMaterials(materials);
                objLoader.setModelName(productModule.component.name);

                const objFile = getUploadedFileSrc({
                    uploadedFile: productModule.component.obj
                });

                objLoader.load(objFile, callbackOnLoadObj, null, null, null, false);
            };

            const mtlLoader = new THREE.MTLLoader();
            const mtlFile = getUploadedFileSrc({
                uploadedFile: productModule.component.mtl
            });

            mtlLoader.load(mtlFile, onLoadMtl);

        } else if (productModule.component.fbx) {
            const fbxLoader = new THREE.FBXLoader();

            const fbxFile = getUploadedFileSrc({
                uploadedFile: productModule.component.fbx
            });

            fbxLoader.load(
                fbxFile,
                (object) => {
                    for (const child of object.children) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                        child.name = productModule.component.id;
                    }
                    this.scene.add(object);
                },
                undefined,
                (error) => {
                    console.log(error);
                }
            );
        }
    }

    private readonly replaceComponentObject = (
        replaced3DGroup: THREE.Group,
        newComponent: FurnitureComponent
    ) => {
        return new Promise((resolve, reject) => {
            try {
                const objLoader = new THREE.OBJLoader2();

                const objFileUrl = getUploadedFileSrc({
                    uploadedFile: newComponent.obj
                });

                objLoader.load(objFileUrl, (event) => {
                    const oldChild = replaced3DGroup.children[0] as THREE.Mesh;

                    const componentScale = this.getComponentScale(newComponent);
                    const loadedObject = event.detail.loaderRootNode;

                    for (const mesh of loadedObject.children) {
                        mesh.castShadow = true;
                        mesh.receiveShadow = true;
                        mesh.scale.set(componentScale, componentScale, componentScale);
                        mesh.material = oldChild.material;
                        mesh.position.set(oldChild.position.x, oldChild.position.y, oldChild.position.z);
                    }

                    loadedObject.name = newComponent.id;
                    this.scene.add(loadedObject);

                    if (this.selectedObject === replaced3DGroup) {
                        this.selectObject(loadedObject);
                    }

                    this.scene.remove(replaced3DGroup);
                    resolve();
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    private readonly addComponentObject = (productModule: ProductModule) => {
        return new Promise((resolve, reject) => {
            try {
                this.loadModule(productModule);
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    private readonly replace3DMeshMaterial = (props: {
        readonly object3D: THREE.Group;
        readonly material: FurnitureMaterial;
    }) => {
        return new Promise((resolve, reject) => {
            try {
                const {
                    object3D,
                    material
                } = props;

                const texture = new window.THREE.TextureLoader();
                const textureFile = getUploadedFileSrc({
                    uploadedFile: material.texture
                });

                texture.load(textureFile, (textureMap) => {
                    object3D.children.forEach((mesh: THREE.Mesh) => {
                        const meshMaterial = mesh.material as THREE.MeshPhongMaterial;
                        meshMaterial.map!.image = textureMap.image;
                        meshMaterial.map!.needsUpdate = true;
                        meshMaterial.needsUpdate = true;
                        meshMaterial.shininess = material.shininess || 0;

                        if (material.view_normalMap) {
                            this.loadNormalMap(material, meshMaterial);
                        } else {
                            meshMaterial.normalMap = null;
                        }
                    });

                    resolve();
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    private readonly removeComponentObject = (productModule: ProductModule) => {
        return new Promise((resolve, reject) => {
            try {
                const childToRemove = this.scene.children.find(o => o.name === productModule.component.id);
                if (!childToRemove) {
                    resolve();
                    return;
                }
                
                this.scene.remove(childToRemove);
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    private readonly getComponentScale = (component: FurnitureComponent) => {
        const { scale } = component;
        return scale ? scale * 0.1 : 0.1;
    }

    private readonly createInitModulesOnLoadHandler = (
        productModule: ProductModule,
        materials: THREE.Material[]
    ) => (event) => {
        const root = event.detail.loaderRootNode;

        const { component } = productModule;
        const componentScale = this.getComponentScale(component);

        for (const child of root.children) {
            // if child has multi material, we need set child's material to first material in the list
            if (Array.isArray(child.material)) {
                child.material = child.material.find((o: THREE.Material) => {
                    for (const materialKey in materials) {
                        if (materials.hasOwnProperty(materialKey)) {
                            const material = materials[materialKey];
                            if (material.name = o.name) {
                                return true;
                            }
                        }
                    }
                });
            }
            child.castShadow = true;
            child.receiveShadow = true;
            child.scale.set(componentScale, componentScale, componentScale);
        }

        root.name = component.id;

        this.scene.add(root);
        this._loaded3DComponents.push(root);

        if (this._loaded3DComponents.length === this.props.productModules.length) {
            this.modulesLoadCompleted();
        }
    }

    private readonly modulesLoadCompleted = () => {
        this.calcComponentsPosition();
        this.setState({
            loaded: true
        });
    }

    private readonly calcComponentsPosition = () => {
        const leg = this.props.productModules.find(o => {
            if (typeof o.component.componentType === 'string') {
                return false;
            }

            return o.component.componentType.position === 'leg';
        });

        if (!leg) {
            return;
        }

        const top = this.props.productModules.find(o => {
            if (typeof o.component.componentType === 'string') {
                return false;
            }

            return o.component.componentType.position === 'top';
        });

        if (!top) {
            return;
        }

        const top3DComponent = this.scene.children.find(o => o.name === top.component.id);
        if (!top3DComponent) {
            return;
        }

        for (const child of top3DComponent.children) {
            const componentHeight = (leg.component.height || 0);
            child.position.setY(componentHeight * 0.1);
        }
    }

    private readonly update3DViewData = (props: {
        readonly prevProductModules: ProductModule[];
        readonly nextProductModules: ProductModule[];
    }) => {
        return new Promise((resolve, reject) => {
            try {
                const {
                    prevProductModules,
                    nextProductModules
                } = props;

                const replaced3DObjects: Array<{
                    readonly object3d: THREE.Group;
                    readonly component: FurnitureComponent;
                }> = [];

                const groups = this.scene.children.filter(o => o instanceof THREE.Group) as THREE.Group[];

                if (nextProductModules.length < prevProductModules.length) {
                    const removedModules = differenceBy(
                        prevProductModules,
                        nextProductModules,
                        (productModule) => productModule.component.id
                    );

                    removedModules.forEach(productModule =>
                        this.addToQueue(
                            () => this.removeComponentObject(productModule)
                        ));
                }

                for (let index = 0; index < nextProductModules.length; index++) {
                    const prevProductModule = prevProductModules[index];
                    const nextProductModule = nextProductModules[index];

                    if (!prevProductModule) {
                        this.addToQueue(
                            () => this.addComponentObject(nextProductModule)
                        );

                        continue;
                    }

                    const oldObject = groups.find(o => o.name === prevProductModule.component.id)!;

                    if (prevProductModule.material.id !== nextProductModule.material.id) {
                        this.addToQueue(
                            () => this.replace3DMeshMaterial({
                                material: nextProductModule.material,
                                object3D: oldObject
                            })
                        );
                    }

                    if (prevProductModule.component.id !== nextProductModule.component.id) {
                        replaced3DObjects.push({
                            object3d: oldObject,
                            component: nextProductModule.component
                        });
                    }
                }

                replaced3DObjects.forEach((value) =>
                    this.addToQueue(() => this.replaceComponentObject(value.object3d, value.component))
                );

                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    readonly takeScreenshot = () => {
        return new Promise<string>((resolve) => {
            this.resetCamera();
            setTimeout(
                () => {
                    const base64 = this.renderer.domElement.toDataURL('image/jpeg');
                    resolve(base64);
                },
                500
            );
        });
    }

    private readonly getHeight = () => {
        const { productType, componentGroup } = this.props;

        const viewportWidth = window.innerWidth;
        const widthRatio = viewportWidth < 400 ? viewportWidth / 400 : viewportWidth / 700;

        const heightOrigin = (componentGroup && componentGroup.view_senceHeight)
            ? componentGroup.view_senceHeight
            : productType.view_senceHeight;

        if (widthRatio < 1) {
            return heightOrigin * widthRatio;
        }

        return heightOrigin;
    }

    public componentDidMount() {
        this.initSence();
        this.initContent();
        const { setSence } = this.props;
        if (setSence) {
            setSence(this);
        }
    }

    public componentDidUpdate(prevProps: ThreeSenceProps) {
        const { selectedObject, componentGroup, productType } = this.props;

        const idModuleChanged = prevProps.productModules !== this.props.productModules;
        if (idModuleChanged) {
            this.addToQueue(() => this.update3DViewData({
                prevProductModules: prevProps.productModules,
                nextProductModules: this.props.productModules
            }));
        }

        if (prevProps.selectedObject !== selectedObject) {
            this.selectObject(selectedObject);
        }

        this.calcComponentsPosition();

        const oldViewportHeight = (prevProps.componentGroup && prevProps.componentGroup.view_senceHeight)
            ? prevProps.componentGroup.view_senceHeight
            : prevProps.productType.view_senceHeight;

        const currentViewportHeight = (componentGroup && componentGroup.view_senceHeight)
            ? componentGroup.view_senceHeight
            : productType.view_senceHeight;

        this.tryResetCanvasSize(oldViewportHeight, currentViewportHeight);
    }

    public componentWillUnmount() {
        if (this.animationFrameId) {
            this.clearScene();
        }
    }

    public render() {
        return (
            <div className="three-sence-wrapper">
                {!this.state.loaded &&
                    <div className="three-sence-loading">
                        <Spin />
                    </div>
                }
                {this.state.isQueueRuning &&
                    <div className="three-sence-loading queue">
                        <Spin />
                    </div>
                }
                <div
                    id="threeViewWindow"
                    ref={(element: HTMLDivElement) => this.container = element}
                    style={{
                        width: '100%',
                        height: this.getHeight()
                    }}
                />
            </div>
        );
    }
}