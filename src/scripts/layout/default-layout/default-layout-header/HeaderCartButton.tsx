import { Button, Tooltip } from 'antd';
import * as React from 'react';
import { ContextRender } from 'react-context-service';
import { RestfulDataContainer } from 'react-restful';

import { RootContext } from '@/app';
import { getOrderDetailsQuantity } from '@/business/order-detail';
import { DomainContext } from '@/domain';
import { text } from '@/i18n';
import { OrderDetail, orderDetailResourceType } from '@/restful';

const buttonStype = {
    marginRight: 10
};

interface HeaderCartButtonProps {
    readonly orderDetails: OrderDetail[];
}

interface HeaderCartButtonState {
    readonly message: React.ReactNode;
}

class HeaderCartButtonComponent extends React.PureComponent<HeaderCartButtonProps, HeaderCartButtonState> {
    static readonly contextType = RootContext;
    readonly context!: DomainContext;

    constructor(props: HeaderCartButtonProps) {
        super(props);
        this.state = {
            message: null
        };
    }

    private readonly onButtonClick = () => {
        const { history } = this.context;
        history.push('/cart');
    }

    public componentDidUpdate(prevProps: HeaderCartButtonProps) {
        if (this.props.orderDetails.length > prevProps.orderDetails.length) {
            this.setState({
                message: text('New items added to your cart..')
            });

            setTimeout(
                () => {
                    this.setState({
                        message: null
                    });
                },
                3000
            );
        }
    }

    public render() {
        const { orderDetails } = this.props;
        const { message } = this.state;
        return (
            <Tooltip
                title={message}
                visible={!!message}
                placement="bottomRight"
            >
                <Button
                    icon="shopping-cart"
                    onClick={this.onButtonClick}
                    style={buttonStype}
                >
                    <span>{text('Your cart')}</span>&nbsp;[<b>{getOrderDetailsQuantity(orderDetails)}</b>]
                </Button>
            </Tooltip>
        );
    }
}

export const HeaderCartButton = React.memo((props) => {

    return (
        <ContextRender<DomainContext> keys={['initOrderDetails']}>
            {({ initOrderDetails }) => (
                <RestfulDataContainer
                    resourceType={orderDetailResourceType}
                    initDataSource={initOrderDetails}
                >
                    {(orderDetails) => <HeaderCartButtonComponent orderDetails={orderDetails} />}
                </RestfulDataContainer>
            )}
        </ContextRender>

    );
});