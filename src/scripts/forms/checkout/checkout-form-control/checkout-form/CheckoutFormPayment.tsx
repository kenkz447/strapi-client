import { Button, Divider, Form } from 'antd';
import * as React from 'react';

import { getOrderTotalPayment } from '@/business/order';
import { verticalLayout, verticalLayoutNoLabel } from '@/components';
import { text } from '@/i18n';
import { formatCurrency, roundTo } from '@/utilities';

import { CheckoutFormOwnProps } from '../CheckoutForm';
import { PaymentPromotionField } from './checkout-form-payment';

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
                <PaymentPromotionField
                    handleChange={handleChange}
                    value={values.promotion}
                    setFieldValue={setFieldValue}
                />
                <Divider dashed={true} />
                <Form.Item
                    wrapperCol={verticalLayout.wrapperCol}
                    labelCol={verticalLayout.labelCol}
                    label={text('Sub total')}
                >
                    <span>{formatCurrency(subTotal)}</span>
                </Form.Item>
                <Form.Item
                    wrapperCol={verticalLayout.wrapperCol}
                    labelCol={verticalLayout.labelCol}
                    label={text('Discount')}
                >
                    <span>
                        {discounts.total && '-' + formatCurrency(discounts.total)}
                        <br />
                        {
                            discounts.promotion ?
                                (
                                    <small style={{ lineHeight: 1.5, display: 'block' }}>
                                        <i>{text('Discount by promo code')} : {formatCurrency(discounts.promotion)}</i>
                                    </small>
                                )
                                : null
                        }
                        <small style={{ lineHeight: 1.5, display: 'block' }}>
                            <i>{text('Discount by agency policy')} : {formatCurrency(discounts.agency.discount)}</i>
                        </small>
                        <small style={{ lineHeight: 1.5, display: 'block' }}>
                            <i>{text('Discount by quantity')} : {formatCurrency(discounts.products)}</i>
                        </small>
                    </span>
                </Form.Item>
                <Form.Item
                    wrapperCol={verticalLayout.wrapperCol}
                    labelCol={verticalLayout.labelCol}
                    label={text('Transport fee')}
                >
                    {
                        transportFee
                            ? (
                                <div>
                                    <span>
                                        {formatCurrency(transportFee.total)}
                                    </span>
                                    <br />
                                    <small style={{ lineHeight: 1, display: 'block' }}>
                                        <i>{text('Tổng khối lượng đơn hàng')} : {roundTo(transportFee.totalVolume, 2)} m<sup>3</sup></i>
                                    </small>
                                </div>
                            )
                            : 0
                    }
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