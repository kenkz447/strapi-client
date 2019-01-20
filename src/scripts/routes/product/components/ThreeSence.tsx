// tslint:disable:no-string-literal
// tslint:disable:no-console
// tslint:disable:no-array-mutation
import './ThreeSence.scss';

import { Spin } from 'antd';
import * as React from 'react';
import { Material } from 'three';

import { getUploadedFileSrc } from '@/business/uploaded-file';
import {
    FurnitureComponent,
    FurnitureMaterial,
    ProductModule
} from '@/restful';

import { ThreeSenceBase, ThreeSenceBaseProps } from './ThreeSenceBase';

const { THREE } = window;

interface ThreeSenceProps extends ThreeSenceBaseProps {
    readonly setSence?: (threeSence: ThreeSence) => void;
}

export class ThreeSence extends ThreeSenceBase<ThreeSenceProps> {
    readonly state = {
        loaded: false
    };

    private _loaded3DComponents: Array<THREE.Group> = [];

    readonly loadNormalMap = (material: FurnitureMaterial, meshMaterial: THREE.MeshPhongMaterial) => {
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
                continue;
            }

            if (productModule.component.fbx) {
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
    }

    private readonly replaceComponentObject = (replaced3DGroup: THREE.Group, newComponent: FurnitureComponent) => {
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
            }

            loadedObject.name = newComponent.id;
            this.scene.add(loadedObject);

            for (const oldChild of replaced3DGroup.children) {
                this.scene.remove(oldChild);
            }

            this.scene.remove(replaced3DGroup);
        });
    }

    private readonly replace3DMeshMaterial = (props: {
        readonly object3D: THREE.Group;
        readonly material: FurnitureMaterial;
    }) => {

        const {
            object3D,
            material
        } = props;

        const texture = new window.THREE.TextureLoader();
        const textureFile = getUploadedFileSrc({
            uploadedFile: material.texture
        });

        const mesh = object3D.children[0] as THREE.Mesh;
        const meshMaterial = mesh.material as THREE.MeshPhongMaterial;

        texture.load(textureFile, (textureMap) => {
            meshMaterial.map!.image = textureMap.image;
            meshMaterial.map!.needsUpdate = true;
            meshMaterial.needsUpdate = true;
            if (material.view_normalMap) {
                this.loadNormalMap(material, meshMaterial);
            } else {
                meshMaterial.normalMap = null;
            }
        });
    }

    private readonly getComponentScale = (component: FurnitureComponent) => {
        const { scale } = component;
        return scale ? scale * 0.1 : 0.1;
    }

    private readonly createInitModulesOnLoadHandler = (
        productModule: ProductModule,
        materials: Material[]
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

    private readonly takeScreenshot = () => {
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

    private readonly update3DViewData = (props: {
        readonly prevProductModules: ProductModule[];
        readonly nextProductModules: ProductModule[];
    }) => {
        const {
            prevProductModules,
            nextProductModules
        } = props;

        const replacingModules = nextProductModules.filter((currentModule) => {
            return !prevProductModules.find(oldModule =>
                oldModule.component.id === currentModule.component.id &&
                oldModule.material.id === currentModule.material.id
            );
        });

        if (!replacingModules.length) {
            return;
        }

        const replaced3DObjects: Array<{
            readonly object3d: THREE.Group;
            readonly component: FurnitureComponent;
        }> = [];

        for (const replacingModule of replacingModules) {
            let skiped = false;
            this.scene.traverse((object3d: THREE.Group) => {
                if (skiped) {
                    return;
                }

                const isComponentObject = object3d instanceof THREE.Group;

                if (!isComponentObject) {
                    return;
                }

                if (replaced3DObjects.find(o => o.object3d === object3d)) {
                    return;
                }

                const productModule = this.props.productModules.find(o => o.component.id === object3d.name);

                if (productModule) {
                    if (replacingModule.component.id !== productModule.component.id) {
                        return;
                    }

                    const mesh = object3d.children.find((o: THREE.Mesh) => !!o.material) as THREE.Mesh | undefined;
                    if (!mesh) {
                        return;
                    }

                    const meshMaterial = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
                    if (meshMaterial.name !== replacingModule.material.id) {
                        this.replace3DMeshMaterial({
                            object3D: object3d,
                            material: replacingModule.material
                        });
                    }
                } else {
                    replaced3DObjects.push({
                        object3d: object3d,
                        component: replacingModule!.component
                    });
                }
                
                skiped = true;
            });
        }

        replaced3DObjects.forEach((value) =>
            this.replaceComponentObject(value.object3d, value.component)
        );
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
        const { selectedObject } = this.props;

        const idModuleChanged = prevProps.productModules !== this.props.productModules;
        if (idModuleChanged) {
            this.update3DViewData({
                prevProductModules: prevProps.productModules,
                nextProductModules: this.props.productModules
            });
        }

        if (selectedObject) {
            this.selectObject(selectedObject);
        }

        this.calcComponentsPosition();
    }

    public componentWillUnmount() {
        if (this.animationFrameId) {
            this.clearScene();
        }
    }

    public render() {
        const { productType } = this.props;

        return (
            <div className="three-sence-wrapper">
                {!this.state.loaded &&
                    <div className="three-sence-loading">
                        <Spin />
                    </div>
                }
                <div
                    id="threeViewWindow"
                    ref={(element: HTMLDivElement) => this.container = element}
                    style={{
                        width: '100%',
                        height: productType.view_senceHeight
                    }}
                />
            </div>
        );
    }
}