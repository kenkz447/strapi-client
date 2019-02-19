import './ProductDetails.scss';

import map from 'lodash/map';
import * as React from 'react';

import { AccessControl, RootContext } from '@/app';
import { DomainContext } from '@/domain';
import { functionAllowed } from '@/domain/policies';

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

        return {
            'Vật liệu bọc': material.materialType && material.name,
            'Chất liệu nệm': productType.mattressMaterial,
            'Loại foam': productType.foamType,
            'Kích thước mặt ngồi': selectedFurnitureComponentGroup!.sittingSurfaceSize,
            'Chiều cao tay (mm)': component.handHeight || selectedProduct!.design.handHeight
        };
    }

    private readonly getLegsInfo = () => {
        const {
            selectedProduct
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

        return {
            'Vật liệu chân': material.materialType && material.name,
            'Chiều cao chân (mm)': component.height
        };
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

        return {
            'Vật liệu mặt bàn': material.materialType && material.name,
            'Đường kính mặt bàn': component.diameter + ' mm'
        };
    }

    private readonly getDetails = () => {
        const { selectedFurnitureComponentGroup } = this.context;

        const common = {
            'Kích thước sản phẩm': selectedFurnitureComponentGroup ?
                selectedFurnitureComponentGroup.productSize : null,
            'Kích thước bao bì': selectedFurnitureComponentGroup ?
                selectedFurnitureComponentGroup.packagingSize : null,
            'Trọng lượng (kg)': selectedFurnitureComponentGroup ?
                selectedFurnitureComponentGroup.weight : null
        };

        const leg = this.getLegsInfo();
        const top = this.getTopInfo();
        const seat = this.getSeatInfo();

        const details = {
            ...top,
            ...seat,
            ...leg,
            ...common
        };

        return map(details, (value, label) => ({ label, value }));
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
                <AccessControl policy={functionAllowed} funcKey="PRODUCT_RELATED_LINK">
                    {(allowed) => allowed ? <ProductLinks /> : null}
                </AccessControl>
            </div>
        );
    }
}