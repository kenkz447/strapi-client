// tslint:disable:no-string-literal
// tslint:disable:no-console
// tslint:disable:no-array-mutation
import './ThreeSence.scss';

import { Spin } from 'antd';
import * as React from 'react';
import styled from 'styled-components';
import { Material } from 'three';

import { getUploadedFileSrc } from '@/business/uploaded-file';
import { FurnitureMaterial, ProductModule } from '@/restful';

import { ThreeSenceBase, ThreeSenceBaseProps } from './ThreeSenceBase';

const { THREE } = window;

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
`;

interface ThreeSenceProps extends ThreeSenceBaseProps {
    readonly selectedObject?: THREE.Group;
    readonly setSence?: (threeSence: ThreeSence) => void;
}

export class ThreeSence extends ThreeSenceBase<ThreeSenceProps> {
    readonly state = {
        loaded: false
    };

    // tslint:disable-next-line:readonly-keyword
    private loaded3DComponents: Array<THREE.Group> = [];

    static readonly loadNormalMap = (material: FurnitureMaterial, meshMaterial: THREE.MeshPhongMaterial) => {
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

    componentDidMount() {
        this.initSence();
        this.initContent();
        const { setSence } = this.props;
        if (setSence) {
            setSence(this);
        }
    }

    componentDidUpdate() {
        const { selectedObject } = this.props;

        if (selectedObject) {
            this.selectObject(selectedObject);
        }

        this.calcComponentsPosition();
    }

    componentWillUnmount() {
        if (this.animationFrameId) {
            this.clearScene();
        }
    }

    render() {
        const { productType } = this.props;

        return (
            <div style={{ position: 'relative', width: '100%' }}>
                {!this.state.loaded &&
                    <Overlay>
                        <Spin />
                    </Overlay>
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

    initContent() {
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
                        if (materials.hasOwnProperty(key)) {
                            const material = materials[key];
                            material.transparent = true;
                            if (material.map) {
                                material.map.anisotropy = 16;
                                if (productModule.material.materialType) {
                                    material.shininess = productModule.material.materialType.view_shiny || 0;
                                }
                            }

                            if (productModule.material.view_normalMap) {
                                ThreeSence.loadNormalMap(productModule.material, material);
                            }
                        }
                    }

                    const objLoader = new THREE.OBJLoader2();
                    const callbackOnLoadObj = this.callbackOnLoadObj(productModule, materials);

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

    readonly callbackOnLoadObj = (productModule: ProductModule, materials: Material[]) => (event) => {
        const root = event.detail.loaderRootNode;

        const { component } = productModule;
        const componentScale = component.scale ? component.scale * 0.1 : 0.1;

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
        this.loaded3DComponents.push(root);

        if (this.loaded3DComponents.length === this.props.productModules.length) {
            this.modulesLoadCompleted();
        }
    }

    readonly modulesLoadCompleted = () => {
        this.calcComponentsPosition();
        this.setState({
            loaded: true
        });
    }

    readonly calcComponentsPosition = () => {
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
}