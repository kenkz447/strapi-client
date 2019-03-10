import { FormikProps } from 'formik';
import * as React from 'react';

import { getAllOrderStatus } from '@/business/order';
import { FormBody, FormSelect, verticalLayout } from '@/components';
import { text } from '@/i18n';
import { Order } from '@/restful';

export type OrderStatusFormValues = Partial<Order>;

export interface OrderStatusFormOwnProps extends FormikProps<OrderStatusFormValues> {
}

const allOrderOptions = getAllOrderStatus();

export function OrderStatusForm(props: OrderStatusFormOwnProps) {
    const {
        values,
        errors,
        setFieldValue
    } = props;

    return (
        <FormBody formProps={props}>
            <FormSelect
                name={nameof<OrderStatusFormValues>(o => o.status)}
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
        </FormBody>
    );
}