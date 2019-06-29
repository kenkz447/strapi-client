import { Badge, Button, Icon, Tooltip } from 'antd';
import { RootContext } from 'qoobee';
import * as React from 'react';
import { WithContextProps } from 'react-context-service';
import { RestfulDataContainer, RestfulRender } from 'react-restful';

import { getOrderDetailsQuantity } from '@/business/order-detail';
import { CART_URL, getMobileUrl } from '@/configs';
import { DomainContext } from '@/domain';
import { text } from '@/i18n';
import {
    OrderDetail,
    orderDetailResources,
    orderDetailResourceType
} from '@/restful';

const buttonStype = {
    marginRight: 24,
    height: 32,
    width: 32,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end'
};

interface MobileHeaderCartButtonProps {
    readonly orderDetails: OrderDetail[];
}

interface MobileHeaderCartButtonState {
    readonly message: React.ReactNode;
}

class MobileHeaderCartButtonComponent extends React.PureComponent<
    MobileHeaderCartButtonProps,
    MobileHeaderCartButtonState
    > {

    static readonly contextType = RootContext;
    readonly context!: WithContextProps<DomainContext>;

    constructor(props: MobileHeaderCartButtonProps) {
        super(props);
        this.state = {
            message: null
        };
    }

    private readonly onButtonClick = () => {
        const { history } = this.context;
        history.push(
            getMobileUrl(CART_URL)
        );
    }

    public componentDidUpdate(prevProps: MobileHeaderCartButtonProps) {
        if (this.props.orderDetails.length > prevProps.orderDetails.length) {
            const setStateCallback = () => {
                scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            };
            
            this.setState(
                { message: text('New items added to your cart') + '...' },
                setStateCallback
            );

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
                <label style={buttonStype} onClick={this.onButtonClick}>
                    <Badge count={getOrderDetailsQuantity(orderDetails)}>
                        <Icon style={{ fontSize: 22 }} type="shopping-cart" />
                    </Badge>
                </label>
            </Tooltip>
        );
    }
}

export const MobileHeaderCartButton = React.memo((props) => {
    const context = React.useContext(RootContext) as WithContextProps<DomainContext>;

    return (
        <RestfulRender
            resource={orderDetailResources.find}
        >
            {(render) => {
                const { data, fetching } = render;

                if (fetching) {
                    return null;
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
                        {(orderDetails) => <MobileHeaderCartButtonComponent orderDetails={orderDetails} />}
                    </RestfulDataContainer>
                );
            }}
        </RestfulRender>
    );
});