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

export interface MobileCartOrderNowButtonProps {
    readonly cartOrderDetails: OrderDetail[];
}

export class MobileCartOrderNowButton extends React.PureComponent<MobileCartOrderNowButtonProps> {
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
                        <Button
                            type="primary"
                            icon="solution"
                            className="w-100"
                            size="large"
                            onClick={this.onCheckoutClick}
                            disabled={!cartOrderDetails.length}
                        >
                            {text('Order now!')}
                        </Button>
                    );
                }}
            </RestfulDataContainer>
        );
    }
}
