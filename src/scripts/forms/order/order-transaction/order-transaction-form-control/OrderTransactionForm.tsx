import { FormikProps } from 'formik';
import * as React from 'react';

import { getOrderTransactionTypeOptions } from '@/business/order-transaction';
import {
    FormBody,
    FormDatePicker,
    FormInput,
    FormInputMoney,
    FormSelect,
    FormTextArea,
    verticalLayout
} from '@/components';
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
            <FormSelect
                name={nameof<OrderTransactionFormValues>(o => o.type)}
                value={values.type}
                setFieldValue={setFieldValue}
                options={allOrderTransactionOptions}
                wrapperCol={verticalLayout.wrapperCol}
                labelCol={verticalLayout.labelCol}
                required={true}
                help={errors.type}
                validateStatus={errors.type ? 'error' : undefined}
                label={text('Transaction type')}
                placeholder={text('Select')}
            />
            <FormInputMoney
                name={nameof<OrderTransactionFormValues>(o => o.money)}
                value={values.money}
                setFieldValue={setFieldValue}
                required={true}
                wrapperCol={verticalLayout.wrapperCol}
                labelCol={verticalLayout.labelCol}
                help={errors.name}
                validateStatus={errors.name ? 'error' : undefined}
                placeholder={text('Input money')}
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
                placeholder={text('Select date')}
                label={text('Date')}
                className="w-100"
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