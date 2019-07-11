import './ProductDetails.scss';

import { Icon } from 'antd';
import { AccessControl, RootContext } from 'qoobee';
import * as React from 'react';

import { getProductDetails } from '@/business/product';
import { getUploadedFileSrc } from '@/business/uploaded-file';
import { DomainContext } from '@/domain';
import { functionAllowed } from '@/domain/policies';
import { ProductModule } from '@/restful';

import { ProductLinks } from './product-details';

interface ProductDetailsProps {
}

export class ProductDetails extends React.PureComponent<ProductDetailsProps> {
    static readonly contextType = RootContext;
    readonly context!: DomainContext;

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
            selectedProduct,
            selectedFurnitureComponentGroup
        } = this.context;

        if (!selectedProduct) {
            return null;
        }

        const details = getProductDetails(
            selectedProduct,
            selectedFurnitureComponentGroup || undefined
        );

        const model3D = selectedFurnitureComponentGroup && (
            selectedFurnitureComponentGroup.model3D
        );

        return (
            <div className="product-details">
                <p><strong>Thông số sản phẩm</strong></p>
                <div>
                    {
                        details.map((detail) => {
                            return (
                                <div className="product-details-item d-flex" key={detail.label}>
                                    <div className="flex-grow-1">{detail.label}:</div>
                                    <div>{detail.value}</div>
                                </div>
                            );
                        })
                    }
                    {
                        model3D ?
                            (
                                <AccessControl policy={functionAllowed} funcKey="FUNC_DOWNLOAD_MODEL">
                                    <div>
                                        <a href={getUploadedFileSrc({ uploadedFile: model3D })} target="_blank">
                                            <Icon type="download" /> Tải về 3D model
                                        </a>
                                    </div>
                                </AccessControl>
                            )
                            : null
                    }
                </div>
                {this.renderMaterialNorms()}
                <AccessControl policy={functionAllowed} funcKey="FUNC_PRODUCT_RELATED_LINK">
                    <ProductLinks />
                </AccessControl>
            </div>
        );
    }
}