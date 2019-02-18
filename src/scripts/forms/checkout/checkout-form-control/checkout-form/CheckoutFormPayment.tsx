import { Alert, Button, Divider, Form, Radio } from 'antd';
import * as React from 'react';

import {
    FormInput,
    FormRadioGroup,
    FormSelect,
    verticalLayout,
    verticalLayoutNoLabel
} from '@/components';
import { text } from '@/i18n';
import { Order } from '@/restful';
import { formatCurrency } from '@/utilities';

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
            errors,
            onNextClick,
            onPrevClick
        } = this.props;

        return (
            <div>
                <Alert message={text('Estimated delivery time') + ': ' + 'DD/MM/YYYY'} />
                <PaymentPromotionField
                    handleChange={handleChange}
                    error={errors.promotion}
                    value={values.promotion}
                />
                <Divider dashed={true}/>
                <Form.Item
                    wrapperCol={verticalLayout.wrapperCol}
                    labelCol={verticalLayout.labelCol}
                    label={text('Total')}
                >
                    xxx
                </Form.Item>
                <Form.Item
                    wrapperCol={verticalLayout.wrapperCol}
                    labelCol={verticalLayout.labelCol}
                    label={text('Discount')}
                >
                    -{formatCurrency(10000)}
                </Form.Item>
                <Form.Item
                    wrapperCol={verticalLayout.wrapperCol}
                    labelCol={verticalLayout.labelCol}
                    label={text('Transport fee')}
                >
                    xxx
                </Form.Item>
                <Form.Item
                    wrapperCol={verticalLayout.wrapperCol}
                    labelCol={verticalLayout.labelCol}
                    label={text('Total of payment')}
                >
                    <span className="checkout-total-payment">
                        {formatCurrency(10000)}
                    </span>
                </Form.Item>
                <Form.Item
                    wrapperCol={verticalLayoutNoLabel.wrapperCol}
                >
                    <Button type="primary" icon="check" onClick={onNextClick}>{text('Checkout')}</Button>
                    <Button onClick={onPrevClick}>{text('Previous')}</Button>
                </Form.Item>
            </div>
        );
    }
}