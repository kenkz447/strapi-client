import { Formik } from 'formik';
import * as React from 'react';

import { FormikControlBase, FormikControlBaseProps } from '@/components';

import {
    OrderStatusForm,
    OrderStatusFormValues
} from './order-status-form-control';

interface OrderFormControlProps extends FormikControlBaseProps<OrderStatusFormValues> {
    readonly initialValues?: OrderStatusFormValues;
}

interface OrderFormControlState {
}

export class OrderFormControl extends FormikControlBase<
    OrderStatusFormValues,
    OrderFormControlProps,
    OrderFormControlState> {

    public render() {
        const { initialValues } = this.props;

        return (
            <Formik
                ref={this.formInstance}
                initialValues={initialValues!}
                onSubmit={this.onSubmit}
            >
                {(formProps) => (
                    <OrderStatusForm
                        {...formProps}
                    />
                )}
            </Formik>
        );
    }
}