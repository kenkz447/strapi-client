import { FormikProps } from 'formik';
import * as React from 'react';

import { getAllOrderStatus } from '@/business/order';
import {
    FormBody,
    FormDatePicker,
    FormSelect,
    verticalLayout
} from '@/components';
import { text } from '@/i18n';
import { Order } from '@/restful';

export type OrderFormValues = Partial<Order>;

export interface OrderFormOwnProps extends FormikProps<OrderFormValues> {
}

const allOrderOptions = getAllOrderStatus();

export function OrderForm(props: OrderFormOwnProps) {
    const {
        values,
        errors,
        setFieldValue
    } = props;

    return (
        <FormBody formProps={props}>
            <FormSelect
                name={nameof<OrderFormValues>(o => o.status)}
                value={values.status}
                setFieldValue={setFieldValue}
                options={allOrderOptions}
                wrapperCol={verticalLayout.wrapperCol}
                labelCol={verticalLayout.labelCol}
                help={errors.status}
                validateStatus={errors.status ? 'error' : undefined}
                label={text('Status')}
                placeholder={text('Select status')}
            />
            <FormDatePicker
                name={nameof<OrderFormValues>(o => o.shippingDate)}
                value={values.shippingDate}
                setFieldValue={setFieldValue}
                required={true}
                wrapperCol={verticalLayout.wrapperCol}
                labelCol={verticalLayout.labelCol}
                help={errors.shippingDate}
                validateStatus={errors.shippingDate ? 'error' : undefined}
                label={text('Shipping date')}
                placeholder={text('Select date')}
                className="w-100"
            />
        </FormBody>
    );
}