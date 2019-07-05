import { RootContext } from 'qoobee';
import * as React from 'react';
import { WithContextProps } from 'react-context-service';
import styled from 'styled-components';

import { BusinessController } from '@/business';
import {
    getOrderDetailPromotionDiscount,
    upsertOrderDetail
} from '@/business/order-detail';
import { PostContent } from '@/components';
import { DomainContext } from '@/domain';
import {
    OrderDetailCreateFormControl,
    OrderDetailCreateFormValues
} from '@/forms/order-detail/order-detail-create';
import { OrderDetail, ProductExtended } from '@/restful';
import { getUrlSearchParam } from '@/utilities';

const ProductAddToCartSimpleWrapper = styled.div`
    min-width: 360px;
`;

interface ProductAddToCartSimpleProps {
    readonly loadedProduct: ProductExtended;
    readonly modulesCode: string;
}

export class ProductAddToCartSimple extends React.PureComponent<ProductAddToCartSimpleProps> {
    public static readonly contextType = RootContext;
    public readonly context!: WithContextProps<DomainContext>;

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

        const productQuantity = promotion.productQuantityOrdering || 1;
        const subTotal = loadedProduct!.totalPrice * productQuantity;

        const initOrderDetailWithPromo: OrderDetail = {
            productDesign: loadedProduct!.design.id,
            product_type: loadedProduct!.productType.id,
            productModulesCode: modulesCode!,
            status: 'temp',

            quantity: productQuantity,

            productPrice: loadedProduct!.totalPrice,
            subTotalPrice: subTotal,
            totalPrice: subTotal,

            totalDiscountPerProduct: 0,
            discount: 0,

            orderDetailMaterialNorms: [],
            storedPromoCode: availableOrderDetailPromoCode,
        };

        const discountByPromotion = getOrderDetailPromotionDiscount(initOrderDetailWithPromo);

        return {
            ...initOrderDetailWithPromo,
            discount: discountByPromotion,
            totalPrice: subTotal - discountByPromotion
        };
    }

    public render() {
        const { loadedProduct, modulesCode } = this.props;

        const disableAddToCart = modulesCode
            ? modulesCode!.includes('999')
            : false;

        const initialValues = this.getAddToCartFormInitValues();

        return (
            <ProductAddToCartSimpleWrapper>
                <BusinessController
                    action={upsertOrderDetail}
                    onSuccess={(orderDetail: OrderDetail) => {
                        if (!orderDetail.storedPromoCode) {
                            return;
                        }

                        const { setContext, availablePromoCodes } = this.context;
                        setContext({
                            availablePromoCodes: availablePromoCodes.filter(o =>
                                o.id !== orderDetail.storedPromoCode!.id
                            )
                        });
                    }}
                >
                    {({ doBusiness }) => (
                        <OrderDetailCreateFormControl
                            initialValues={initialValues}
                            submitDisabled={
                                disableAddToCart
                            }
                            product={loadedProduct}
                            submit={doBusiness}
                            simpleMode={true}
                        />
                    )}
                </BusinessController>
            </ProductAddToCartSimpleWrapper>
        );
    }
}