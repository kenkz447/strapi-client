import * as React from 'react';

import { BusinessController } from '@/business';
import { upsertOrderDetail } from '@/business/order-detail';
import {
    OrderDetailCreateFormControl
} from '@/forms/order-detail/order-detail-create';
import { ProductExtended } from '@/restful';

interface ProductAddToCartProps {
    readonly loadedProduct: ProductExtended;
    readonly modulesCode: string;
}

export class ProductAddToCart extends React.PureComponent<ProductAddToCartProps> {
    public render() {
        const { loadedProduct, modulesCode } = this.props;

        const disableAddToCart = modulesCode
            ? modulesCode!.includes('999')
            : false;
        
        return (
            <div style={{ minWidth: 360 }}>
                <BusinessController
                    action={upsertOrderDetail}
                >
                    {({ doBusiness }) => (
                        <OrderDetailCreateFormControl
                            initialValues={{
                                productDesign: loadedProduct!.design.id,
                                product_type: loadedProduct!.productType.id,
                                productModulesCode: modulesCode!,
                                status: 'temp',
                                productPrice: loadedProduct!.totalPrice
                            }}
                            submitDisabled={disableAddToCart}
                            product={loadedProduct}
                            submit={doBusiness}
                        />
                    )}
                </BusinessController>
            </div>
        );
    }
}