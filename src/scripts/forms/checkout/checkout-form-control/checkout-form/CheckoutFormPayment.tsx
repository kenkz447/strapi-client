import { Alert, Button, Divider, Form, Icon, Tooltip } from 'antd';
import * as React from 'react';

import { getOrderTotalPayment } from '@/business/order/getters/getOrderPayment';
import { verticalLayout, verticalLayoutNoLabel } from '@/components';
import { text } from '@/i18n';
import { formatCurrency, formatDate } from '@/utilities';

import { CheckoutFormOwnProps } from '../CheckoutForm';
import { PaymentPromotionField } from './checkout-form-payment';

const formMetaStyle = {
    width: 130,
    display: 'inline-block'
};

interface CheckoutFormPaymentProps extends CheckoutFormOwnProps {
    readonly onNextClick: () => void;
    readonly onPrevClick: () => void;
}

export class CheckoutFormPayment extends React.PureComponent<CheckoutFormPaymentProps> {
    public render() {
        const {
            setFieldValue,
            handleChange,
            values,
            isSubmitting,
            onPrevClick,
            onNextClick
        } = this.props;

        const orderTotal = getOrderTotalPayment(values);
        if (!orderTotal) {
            return null;
        }

        const {
            discounts,
            subTotal,
            totalPayment,
            transportFee,
        } = orderTotal;

        return (
            <div>
                <Alert
                    message={text('Estimated delivery time') + ': ' + formatDate(values.shippingDate, 'DD/MM/YYYY')}
                />
                <PaymentPromotionField
                    handleChange={handleChange}
                    value={values.promotion}
                    setFieldValue={setFieldValue}
                />
                <Divider dashed={true} />
                <Form.Item
                    wrapperCol={verticalLayout.wrapperCol}
                    labelCol={verticalLayout.labelCol}
                    label={text('Total')}
                >
                    <span>{formatCurrency(subTotal)}</span>
                </Form.Item>
                <Form.Item
                    wrapperCol={verticalLayout.wrapperCol}
                    labelCol={verticalLayout.labelCol}
                    label={text('Discount')}
                >
                    <Tooltip
                        placement="right"
                        title={(
                            <div>
                                <div>
                                    <span style={formMetaStyle}>
                                        {text('Products discount')}:
                                    </span>
                                    {formatCurrency(discounts.products)}
                                </div>
                                <div>
                                    <span style={formMetaStyle}>
                                        {text('Promo code')}:
                                    </span>
                                    {formatCurrency(discounts.promotion)}
                                </div>
                                <div>
                                    <span style={formMetaStyle}>
                                        {discounts.agency.name}:
                                    </span>
                                    {formatCurrency(discounts.agency.discount)}
                                </div>
                            </div>
                        )}
                    >
                        <span>
                            {discounts.total && '-' + formatCurrency(discounts.total)}
                            &nbsp;
                            <Icon type="question-circle" theme="twoTone" />
                        </span>
                    </Tooltip>
                </Form.Item>
                <Form.Item
                    wrapperCol={verticalLayout.wrapperCol}
                    labelCol={verticalLayout.labelCol}
                    label={text('Transport fee')}
                >
                    {transportFee ? formatCurrency(transportFee.total) : 0}
                </Form.Item>
                <Form.Item
                    wrapperCol={verticalLayout.wrapperCol}
                    labelCol={verticalLayout.labelCol}
                    label={text('Total of payment')}
                >
                    <div>
                        <span className="checkout-total-payment">
                            {formatCurrency(totalPayment)}
                        </span>
                        <br />
                        <small style={{ lineHeight: 1, display: 'block' }}>
                            <i>{text('VAT included')}</i>
                        </small>
                    </div>
                </Form.Item>
                <Form.Item
                    wrapperCol={verticalLayoutNoLabel.wrapperCol}
                >
                    <Button
                        type="primary"
                        onClick={onNextClick}
                    >
                        {text('Next')}
                    </Button>
                    <Button
                        onClick={onPrevClick}
                        disabled={isSubmitting}
                    >
                        {text('Previous')}
                    </Button>
                </Form.Item>
            </div>
        );
    }
}