import { Formik } from 'formik';
import * as React from 'react';

import { FormikControlBase, FormikControlBaseProps } from '@/components';

import {
    OrderDeliveryDateForm,
    OrderDeliveryDateFormValues
} from './order-delivery-date-form-control';

interface OrderDeliveryDateFormControlProps extends FormikControlBaseProps<OrderDeliveryDateFormValues> {
    readonly initialValues?: OrderDeliveryDateFormValues;
}

interface OrderDeliveryDateFormControlState {
}

export class OrderDeliveryDateFormControl extends FormikControlBase<
    OrderDeliveryDateFormValues,
    OrderDeliveryDateFormControlProps,
    OrderDeliveryDateFormControlState> {

    public render() {
        const { initialValues } = this.props;

        return (
            <Formik
                ref={this.formInstance}
                initialValues={initialValues!}
                onSubmit={this.onSubmit}
            >
                {(formProps) => (
                    <OrderDeliveryDateForm
                        {...formProps}
                    />
                )}
            </Formik>
        );
    }
}