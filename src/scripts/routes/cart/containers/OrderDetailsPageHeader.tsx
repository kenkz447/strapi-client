import { PageHeader } from 'ant-design-pro';
import { Button } from 'antd';
import { RootContext } from 'qoobee';
import * as React from 'react';
import { RestfulDataContainer } from 'react-restful';

import { CHECKOUT_URL } from '@/configs';
import { DomainContext } from '@/domain';
import { text } from '@/i18n';
import { OrderDetail, orderDetailResourceType } from '@/restful';

const breadcrumbList = [{
    title: text('Dashboard'),
    href: '/'
}, {
    title: text('Shopping cart'),
}];

export interface OrderDetailsPageHeaderProps {
    readonly cartOrderDetails: OrderDetail[];
}

export class OrderDetailsPageHeader extends React.PureComponent<OrderDetailsPageHeaderProps> {
    static readonly contextType = RootContext;
    readonly context!: DomainContext;

    private readonly onCheckoutClick = () => {
        const { history } = this.context;
        history.push(CHECKOUT_URL);
    }

    public render() {
        const { cartOrderDetails } = this.props;
        return (
            <RestfulDataContainer
                resourceType={orderDetailResourceType}
                initDataSource={cartOrderDetails!}
            >
                {() => {
                    return (
                        <PageHeader
                            title={text('Your cart')}
                            breadcrumbList={breadcrumbList}
                            content={<div />}
                            action={
                                <Button
                                    type="primary"
                                    icon="solution"
                                    onClick={this.onCheckoutClick}
                                    disabled={!cartOrderDetails.length}
                                >
                                    {text('Order now!')}
                                </Button>
                            }
                        />
                    );
                }}
            </RestfulDataContainer>
        );
    }
}
