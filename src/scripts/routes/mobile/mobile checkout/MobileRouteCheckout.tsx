import { Card } from 'antd';
import { RouteInfo } from 'qoobee';
import * as React from 'react';
import { Redirect } from 'react-router';
import styled from 'styled-components';

import { BusinessController } from '@/business';
import { upsertOrder } from '@/business/order';
import { PageWrapper, SlideUp } from '@/components';
import { CART_URL, CHECKOUT_URL, getMobileUrl } from '@/configs';
import { AppPageProps, DomainContext, RoutePage } from '@/domain';
import { CheckoutFormControl } from '@/forms/checkout';
import { text } from '@/i18n';
import { Order } from '@/restful';

import { CheckoutComplete } from './containers';

const MobileRouteCheckoutWrapper = styled.div`
    padding: 24px 0 0 0;
    background: inherit;
    h1 {
        padding-left: 24px;
    }

    .ant-form-item-label {
        padding: 0;
        line-height: 40px;
    }
`;

type MobileRouteCheckoutProps = AppPageProps;

interface MobileRouteCheckoutState {
    readonly checkoutResultOrder?: Order;
}

export class MobileRouteCheckout extends RoutePage<MobileRouteCheckoutProps, MobileRouteCheckoutState> {
    static readonly withContext = [
        nameof<DomainContext>(o => o.cartOrderDetails),
        nameof<DomainContext>(o => o.currentAgency)
    ];

    static readonly routeInfo: RouteInfo = {
        path: getMobileUrl(CHECKOUT_URL),
        title: text('Checkout'),
        exact: true
    };

    constructor(props: MobileRouteCheckoutProps) {
        super(props);
        this.state = {};
    }

    public componentDidUpdate() {
        if (!this.state.checkoutResultOrder) {
            return;
        }

        const { setContext, cartOrderDetails } = this.props;

        if (!cartOrderDetails.length) {
            return;
        }

        setContext({
            cartOrderDetails: []
        });
    }

    public render() {
        const {
            cartOrderDetails,
            currentAgency
        } = this.props;
        const { checkoutResultOrder } = this.state;

        if (!checkoutResultOrder && !cartOrderDetails.length) {
            return <Redirect to={CART_URL} />;
        }

        const initialValues: Partial<Order> = {
            orderDetails: cartOrderDetails,
            agencyOrderer: currentAgency,
            addressType: 'house'
        };

        return (
            <PageWrapper>
                <MobileRouteCheckoutWrapper>
                    <h1>ĐẶT HÀNG</h1>
                    <SlideUp>
                        <Card>
                            {
                                checkoutResultOrder
                                    ? (<CheckoutComplete order={checkoutResultOrder} />)
                                    : (
                                        <BusinessController
                                            action={upsertOrder}
                                            onSuccess={(result: Order, context) => {
                                                this.setState({
                                                    checkoutResultOrder: result
                                                });

                                                context.setContext({
                                                    cartOrderDetails: []
                                                });
                                            }}
                                        >
                                            {({ doBusiness }) => {
                                                return (
                                                    <CheckoutFormControl
                                                        showSteps={false}
                                                        initialValues={initialValues}
                                                        submit={doBusiness}
                                                    />
                                                );
                                            }}
                                        </BusinessController>
                                    )
                            }
                        </Card>
                    </SlideUp>
                </MobileRouteCheckoutWrapper>
            </PageWrapper>
        );
    }
}