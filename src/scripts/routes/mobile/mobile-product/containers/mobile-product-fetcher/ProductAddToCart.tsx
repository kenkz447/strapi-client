import { Alert } from 'antd';
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

const ProductAddToCartWrapper = styled.div`
    min-width: 360px;
    padding-left: 24px;
    .ant-form-item-label {
        padding-bottom: 0;
        line-height: 40px;
    }
`;

interface ProductAddToCartProps {
    readonly loadedProduct: ProductExtended;
    readonly modulesCode: string;
}

export class ProductAddToCart extends React.PureComponent<ProductAddToCartProps> {
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

    private readonly onViewPromoDetailClick = () => {
        const { setContext } = this.context;

        const { promotion } = this.getAvailableOrderDetailPromoCode()!;

        if (!promotion.linkedPost) {
            return;
        }

        setContext({
            globalModalVisibled: true,
            globalModal: {
                className: 'full-screen',
                width: 800,
                title: promotion.description,
                closable: false,
                children: (
                    <PostContent
                        postSlug=""
                        postId={
                            typeof promotion.linkedPost === 'string'
                                ? promotion.linkedPost
                                : promotion.linkedPost.id
                        }
                    />
                )
            }
        });
    }

    public render() {
        const { loadedProduct, modulesCode } = this.props;

        const disableAddToCart = modulesCode
            ? modulesCode!.includes('999')
            : false;

        const initialValues = this.getAddToCartFormInitValues();
        const isPromotion = !!initialValues.storedPromoCode;

        return (
            <ProductAddToCartWrapper>
                {
                    isPromotion && (
                        <Alert
                            type="success"
                            message={
                                <div>
                                    Bạn nhận được ưu đãi cho sản phẩm này - <a onClick={this.onViewPromoDetailClick}>xem chi tiết</a>
                                </div>
                            }
                        />
                    )
                }
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
                        />
                    )}
                </BusinessController>
            </ProductAddToCartWrapper>
        );
    }
}