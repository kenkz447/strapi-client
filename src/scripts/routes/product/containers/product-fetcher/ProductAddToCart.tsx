import { RootContext } from 'qoobee';
import * as React from 'react';
import styled from 'styled-components';

import { BusinessController } from '@/business';
import { upsertOrderDetail } from '@/business/order-detail';
import { DomainContext } from '@/domain';
import {
    OrderDetailCreateFormControl,
    OrderDetailCreateFormValues
} from '@/forms/order-detail/order-detail-create';
import { OrderDetail, ProductExtended } from '@/restful';
import { getUrlSearchParam } from '@/utilities';

const ProductAddToCartWrapper = styled.div`
    min-width: 360px;
`;

interface ProductAddToCartProps {
    readonly loadedProduct: ProductExtended;
    readonly modulesCode: string;
}

export class ProductAddToCart extends React.PureComponent<ProductAddToCartProps> {
    public static readonly contextType = RootContext;
    public readonly context!: DomainContext;

    private readonly getSelectProductTypeId = () => {
        return getUrlSearchParam('productType')!;
    }

    private readonly getAvailableOrderDetailPromoCodes = () => {
        const { availablePromoCodes } = this.context;
        return availablePromoCodes.filter(o => o.promotion.useFor === 'orderDetail');
    }

    private readonly getAvailableOrderDetailPromoCode = () => {
        const availableOrderDetailPromoCodes = this.getAvailableOrderDetailPromoCodes();
        const selectedProductTypeId = this.getSelectProductTypeId();

        return availableOrderDetailPromoCodes.find(o => {
            return (o.promotion.forProductTypes as string[])
                .includes(selectedProductTypeId);
        });
    }

    private readonly getAddToCartFormInitValues = (): OrderDetailCreateFormValues => {
        const { loadedProduct, modulesCode } = this.props;

        const availableOrderDetailPromoCode = this.getAvailableOrderDetailPromoCode();

        if (!availableOrderDetailPromoCode) {
            return {
                productDesign: loadedProduct!.design.id,
                product_type: loadedProduct!.productType.id,
                productModulesCode: modulesCode!,
                status: 'temp',
                productPrice: loadedProduct!.totalPrice
            };
        }

        const { promotion } = availableOrderDetailPromoCode;

        return {
            productDesign: loadedProduct!.design.id,
            product_type: loadedProduct!.productType.id,
            productModulesCode: modulesCode!,
            status: 'temp',
            productPrice: loadedProduct!.totalPrice,
            quantity: promotion.productQuantityOrdering,
            storedPromotionCode: availableOrderDetailPromoCode
        };
    }

    public render() {

        const { loadedProduct, modulesCode } = this.props;

        const disableAddToCart = modulesCode
            ? modulesCode!.includes('999')
            : false;

        const initialValues = this.getAddToCartFormInitValues();

        return (
            <ProductAddToCartWrapper>
                <BusinessController
                    action={upsertOrderDetail}
                >
                    {({ doBusiness }) => (
                        <OrderDetailCreateFormControl
                            initialValues={initialValues}
                            submitDisabled={
                                initialValues.storedPromotionCode
                                    ? false
                                    : disableAddToCart
                            }
                            product={loadedProduct}
                            submit={doBusiness}
                        />
                    )}
                </BusinessController>
            </ProductAddToCartWrapper>
        );
    }
}