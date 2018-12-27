import { Formik } from 'formik';
import * as React from 'react';

import { FormikControlBase, FormikControlBaseProps } from '@/components';

import { OrderForm, OrderFormValues } from './order-form-control';

interface OrderFormControlProps extends FormikControlBaseProps<OrderFormValues> {
    readonly initialValues?: OrderFormValues;
}

interface OrderFormControlState {
}

export class OrderFormControl extends FormikControlBase<
    OrderFormValues,
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
                    <OrderForm
                        {...formProps}
                    />
                )}
            </Formik>
        );
    }
}