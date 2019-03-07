import 'ant-design-pro/lib/Result/style/css';

import Result from 'ant-design-pro/lib/Result';
import { Button, Form } from 'antd';
import { RootContext } from 'qoobee';
import * as React from 'react';
import styled from 'styled-components';

import { verticalLayout } from '@/components';
import { ORDER_DETAIL_URL, PRODUCT_PATH } from '@/configs';
import { DomainContext } from '@/domain';
import { text } from '@/i18n';
import { Order } from '@/restful';
import { formatCurrency, formatDate, replaceRoutePath } from '@/utilities';

const CheckoutCompleteWrapper = styled.div`
    margin-top: 50px;
    .ant-form-item {
        margin-bottom: 0;
        .total {
            font-size: 20px;
            line-height: 0;
        }
    }
`;

interface CheckoutCompleteProps {
    readonly order: Order;
}

export class CheckoutComplete extends React.PureComponent<CheckoutCompleteProps> {
    static readonly contextType = RootContext;
    readonly context!: DomainContext;

    public render() {
        const { order } = this.props;
        const { history } = this.context;
        return (
            <CheckoutCompleteWrapper>
                <Result
                    style={{ maxWidth: 560 }}
                    type="success"
                    title={<div>{text('Completed')}</div>}
                    description={
                        <div>
                            {text('The request has been sent, we will contact you as soon as possible!')}
                        </div>
                    }
                    extra={(
                        <div>
                            <Form.Item
                                wrapperCol={verticalLayout.wrapperCol}
                                labelCol={verticalLayout.labelCol}
                                label={text('Expected delivery')}
                            >
                                {order && formatDate(order.shippingDate, 'DD/MM/YYYY')}
                            </Form.Item>
                            <Form.Item
                                wrapperCol={verticalLayout.wrapperCol}
                                labelCol={verticalLayout.labelCol}
                                label={text('Total of payment')}
                            >
                                <span className="total">{order ? formatCurrency(order.totalOfPayment) : 0}</span>
                            </Form.Item>
                        </div>
                    )}
                    actions={
                        <div>
                            <Button
                                type="primary"
                                onClick={() => {
                                    history.push(replaceRoutePath(ORDER_DETAIL_URL, order));
                                }}
                            >
                                {text('View the order')}
                            </Button>
                            <Button
                                onClick={() => {
                                    history.push(PRODUCT_PATH);
                                }}
                            >
                                {text('Buy more')}
                            </Button>
                        </div>
                    }
                />
            </CheckoutCompleteWrapper>
        );
    }
}