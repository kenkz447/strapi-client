import { Button } from 'antd';
import * as React from 'react';
import { RestfulDataContainer } from 'react-restful';

import { RootContext } from '@/app';
import { getOrderDetailsQuantity } from '@/business/order-detail';
import { DomainContext } from '@/domain';
import { text } from '@/i18n';
import { orderDetailResourceType } from '@/restful';

const buttonStype = {
    marginRight: 10
};

interface HeaderCartButtonProps {
}

export class HeaderCartButton extends React.PureComponent<HeaderCartButtonProps> {
    static readonly contextType = RootContext;
    readonly context!: DomainContext;

    private readonly onButtonClick = () => {
        const { history } = this.context;
        history.push('/cart');
    }

    public render() {
        const { history, initOrderDetails } = this.context;
        return (
            <RestfulDataContainer
                resourceType={orderDetailResourceType}
                initDataSource={initOrderDetails}
            >
                {(orderDetails) => (
                    <Button
                        icon="shopping-cart"
                        onClick={this.onButtonClick}
                        style={buttonStype}
                    >
                        <span>{text('Your cart')}</span>&nbsp;[<b>{getOrderDetailsQuantity(orderDetails)}</b>]
                    </Button>
                )}
            </RestfulDataContainer>
        );
    }
}
