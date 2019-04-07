import { Button, Tooltip } from 'antd';
import { RootContext } from 'qoobee';
import * as React from 'react';
import { WithContextProps } from 'react-context-service';
import { RestfulDataContainer, RestfulRender } from 'react-restful';

import { getOrderDetailsQuantity } from '@/business/order-detail';
import { DomainContext } from '@/domain';
import { text } from '@/i18n';
import {
    OrderDetail,
    orderDetailResources,
    orderDetailResourceType
} from '@/restful';

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
    readonly context!: WithContextProps<DomainContext>;

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

    public componentDidMount() {
        const { setContext } = this.context;
        const { orderDetails } = this.props;

        setContext({
            cartOrderDetails: orderDetails
        });
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
                    <span>{text('Your cart')}</span>
                    &nbsp;
                    [<b>{getOrderDetailsQuantity(orderDetails)}</b>]
                </Button>
            </Tooltip>
        );
    }
}

export const HeaderCartButton = React.memo((props) => {
    const context = React.useContext(RootContext) as WithContextProps<DomainContext>;

    return (
        <RestfulRender
            resource={orderDetailResources.find}
        >
            {(render) => {
                const { data, fetching } = render;

                if (fetching) {
                    return (
                        <Button
                            icon="shopping-cart"
                            style={buttonStype}
                            loading={true}
                        >
                            {text('Loading')}
                        </Button>
                    );
                }

                return (
                    <RestfulDataContainer
                        resourceType={orderDetailResourceType}
                        initDataSource={data || []}
                        filter={(orderDetail) => !orderDetail.order}
                        onNewRecordsMapping={(records) => {
                            context.setContext({
                                cartOrderDetails: context.cartOrderDetails.concat(records)
                            });
                        }}
                        onRecordRemove={(record) => {
                            context.setContext({
                                cartOrderDetails: context.cartOrderDetails.filter(o => o.id !== record.id)
                            });
                        }}
                    >
                        {(orderDetails) => <HeaderCartButtonComponent orderDetails={orderDetails} />}
                    </RestfulDataContainer>
                );
            }}
        </RestfulRender>
    );
});