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

export type OrderDeliveryDateFormValues = Partial<Order>;

export interface OrderDeliveryDateFormOwnProps extends FormikProps<OrderDeliveryDateFormValues> {
}

export function OrderDeliveryDateForm(props: OrderDeliveryDateFormOwnProps) {
    const {
        values,
        errors,
        setFieldValue
    } = props;

    return (
        <FormBody formProps={props}>
            <FormDatePicker
                name={nameof<OrderDeliveryDateFormValues>(o => o.shippingDate)}
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