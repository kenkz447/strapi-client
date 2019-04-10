import './ProductDetails.scss';

import map from 'lodash/map';
import { AccessControl, RootContext } from 'qoobee';
import * as React from 'react';

import { DomainContext } from '@/domain';
import { functionAllowed } from '@/domain/policies';
import { FurnitureMaterial, ProductModule } from '@/restful';

import { ProductLinks } from './product-details';

interface ProductDetailsProps {
}

export class ProductDetails extends React.PureComponent<ProductDetailsProps> {
    static readonly contextType = RootContext;
    readonly context!: DomainContext;

    private readonly getSeatInfo = () => {
        const {
            selectedProduct,
            selectedFurnitureComponentGroup
        } = this.context;

        const seatModule = selectedProduct!.modules.find(o => {
            if (typeof o.component.componentType === 'string') {
                return false;
            }

            return o.component.componentType.position === 'seat';
        });

        if (!seatModule) {
            return null;
        }

        const { material, component } = seatModule;
        const productType = selectedProduct!.productType;

        return [
            {
                title: 'Vật liệu bọc',
                value: material.materialType && material.name
            },
            {
                title: 'Chất liệu nệm',
                value: selectedFurnitureComponentGroup
                    ? selectedFurnitureComponentGroup.mattressMaterial
                    : productType.mattressMaterial
            },
            {
                title: 'Loại foam',
                value: selectedFurnitureComponentGroup
                    ? selectedFurnitureComponentGroup.foamType
                    : productType.foamType,
            },
            {
                title: 'Chiều cao tay (mm)',
                value: component.handHeight
                    || (selectedFurnitureComponentGroup && selectedFurnitureComponentGroup.handHeight)
                    || selectedProduct!.design.handHeight,
            },
            {
                title: 'Chiều cao ngồi (mm)',
                value: selectedFurnitureComponentGroup
                    ? selectedFurnitureComponentGroup.sittingHeight
                    : ''
            }
        ];
    }

    private readonly getLegsInfo = () => {
        const {
            selectedProduct,
            selectedFurnitureComponentGroup
        } = this.context;

        const legModules = selectedProduct!.modules.find(o => {
            if (typeof o.component.componentType === 'string') {
                return false;
            }

            return o.component.componentType.position === 'leg';
        });

        if (!legModules) {
            return null;
        }

        const { material, component } = legModules;

        return [
            {
                title: 'Vật liệu chân',
                value: material.materialType && material.name
            },
            {
                title: 'Chiều cao chân (mm)',
                value: component.displayHeight
                    || component.height
                    || (selectedFurnitureComponentGroup && selectedFurnitureComponentGroup!.legHeight)
            }
        ];
    }

    private readonly getTopInfo = () => {
        const {
            selectedProduct
        } = this.context;

        const legModules = selectedProduct!.modules.find(o => {
            if (typeof o.component.componentType === 'string') {
                return false;
            }

            return o.component.componentType.position === 'top';
        });

        if (!legModules) {
            return null;
        }

        const { material, component } = legModules;

        return [
            {
                title: 'Vật liệu mặt bàn',
                value: material.materialType && material.name
            },
            {
                title: 'Đường kính mặt bàn',
                value: component.diameter + ' mm'
            }
        ];
    }

    private readonly getDetails = () => {
        const { selectedFurnitureComponentGroup } = this.context;

        const common = [
            {
                title: 'Kích thước tổng thể WxDxH (mm)',
                value: selectedFurnitureComponentGroup
                    ? selectedFurnitureComponentGroup.productSize
                    : null
            },
            {
                title: 'Kích thước bao bì',
                value: selectedFurnitureComponentGroup
                    ? selectedFurnitureComponentGroup.packagingSize
                    : null
            },
            {
                title: 'Trọng lượng (kg)',
                value: selectedFurnitureComponentGroup
                    ? selectedFurnitureComponentGroup.weight
                    : null
            },
            {
                title: 'Kích thước nệm ngồi',
                value: selectedFurnitureComponentGroup
                    ? selectedFurnitureComponentGroup!.sittingSurfaceSize
                    : ''
            }
        ];

        const leg = this.getLegsInfo();
        const top = this.getTopInfo();
        const seat = this.getSeatInfo();

        let details = [
            ...common,
            ...top /**   */ || [],
            ...seat /**  */ || [],
            ...leg /**   */ || []
        ];

        details = details.sort((item1, item2) => {
            const title1 = item1.title.toUpperCase();
            const title2 = item2.title.toUpperCase();
            return (title1 < title2) ? -1 : (title1 > title2) ? 1 : 0;
        });

        return details.map(o => ({
            label: o.title,
            value: o.value
        }));
    }

    private readonly renderMaterialNorms = () => {
        const { selectedProduct } = this.context;

        if (!selectedProduct) {
            return null;
        }

        const { modules } = selectedProduct;

        const materialNorms: ProductModule[] = [];

        for (const productModule of modules) {
            if (
                !productModule.component.materialNorm
                || !productModule.material.isExternal
            ) {
                continue;
            }

            materialNorms.push(productModule);
        }

        if (!materialNorms.length) {
            return null;
        }
        
        return (
            <div>
                <div className="white-space-2" />
                <h4>Định mức vật liệu</h4>
                {
                    materialNorms.map((o, i) => {
                        return (
                            <div
                                className="product-details-item d-flex"
                                key={i}
                            >
                                <div className="flex-grow-1">{o.material.name} (m):</div>
                                <div>{o.component.materialNorm}</div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }

    public render() {
        const {
            selectedProduct
        } = this.context;

        if (!selectedProduct) {
            return null;
        }

        const details = this.getDetails();
        return (
            <div className="product-details">
                <p><strong>Thông số sản phẩm</strong></p>
                <div>
                    {
                        details.map((detail) => {
                            if (!detail.value) {
                                return null;
                            }

                            return (
                                <div className="product-details-item d-flex" key={detail.label}>
                                    <div className="flex-grow-1">{detail.label}:</div>
                                    <div>{detail.value}</div>
                                </div>
                            );
                        })}
                </div>
                {this.renderMaterialNorms()}
                <AccessControl policy={functionAllowed} funcKey="FUNC_PRODUCT_RELATED_LINK">
                    <ProductLinks />
                </AccessControl>
            </div>
        );
    }
}