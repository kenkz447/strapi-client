import { Radio } from 'antd';
import { FormikProps } from 'formik';
import * as React from 'react';

import { getOrderTransactionTypeOptions } from '@/business/order-transaction';
import {
    FormBody,
    FormDatePicker,
    FormInput,
    FormInputMoney,
    FormRadioGroup,
    FormSelect,
    FormTextArea,
    verticalLayout
} from '@/components';
import { FormUpload } from '@/components/formik/FormUpload';
import { text } from '@/i18n';
import { OrderTransaction } from '@/restful';

export type OrderTransactionFormValues = Partial<OrderTransaction>;

export interface OrderTransactionFormOwnProps extends FormikProps<OrderTransactionFormValues> {
}

const allOrderTransactionOptions = getOrderTransactionTypeOptions();

export function OrderTransactionForm(props: OrderTransactionFormOwnProps) {
    const {
        values,
        errors,
        handleChange,
        setFieldValue
    } = props;

    return (
        <FormBody formProps={props}>
            <FormRadioGroup
                name={nameof<OrderTransactionFormValues>(o => o.type)}
                value={values.type}
                onChange={handleChange}
                wrapperCol={verticalLayout.wrapperCol}
                labelCol={verticalLayout.labelCol}
                label={text('Loại giao dịch')}
                required={true}
            >
                <Radio value="deposit">{text('deposit')}</Radio>
                <Radio value="payment">{text('payment')}</Radio>
            </FormRadioGroup>
            <FormInputMoney
                name={nameof<OrderTransactionFormValues>(o => o.money)}
                value={values.money}
                setFieldValue={setFieldValue}
                required={true}
                wrapperCol={verticalLayout.wrapperCol}
                labelCol={verticalLayout.labelCol}
                help={errors.name}
                validateStatus={errors.name ? 'error' : undefined}
                placeholder={text('input money')}
                label={text('Money')}
                className="w-100"
            />
            <FormDatePicker
                name={nameof<OrderTransactionFormValues>(o => o.date)}
                value={values.date}
                setFieldValue={setFieldValue}
                required={true}
                wrapperCol={verticalLayout.wrapperCol}
                labelCol={verticalLayout.labelCol}
                help={errors.date}
                validateStatus={errors.date ? 'error' : undefined}
                placeholder={text('select date')}
                label={text('Date')}
                className="w-100"
            />
            <FormUpload
                name={nameof.full<OrderTransactionFormValues>(o => o.attachment)}
                setFieldValue={setFieldValue}
                value={values.attachment}
                validateStatus={errors.attachment ? 'error' : undefined}
                label={text('Attachment')}
                buttonType="default"
                wrapperCol={verticalLayout.wrapperCol}
                labelCol={verticalLayout.labelCol}
            />
            <FormTextArea
                name={nameof<OrderTransactionFormValues>(o => o.note)}
                onChange={handleChange}
                value={values.note}
                placeholder="Nhập ghi chú"
                label="Ghi chú"
            />
        </FormBody>
    );
}