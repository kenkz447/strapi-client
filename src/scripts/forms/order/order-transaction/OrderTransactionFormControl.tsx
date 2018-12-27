import { Formik } from 'formik';
import * as React from 'react';

import { FormikControlBase, FormikControlBaseProps } from '@/components';

import {
    OrderTransactionForm,
    OrderTransactionFormValues
} from './order-transaction-form-control';

interface OrderTransactionFormControlProps extends FormikControlBaseProps<OrderTransactionFormValues> {
    readonly initialValues?: OrderTransactionFormValues;
}

interface OrderTransactionFormControlState {
}

export class OrderTransactionFormControl extends FormikControlBase<
    OrderTransactionFormValues,
    OrderTransactionFormControlProps,
    OrderTransactionFormControlState> {

    public render() {
        const { initialValues } = this.props;

        return (
            <Formik
                ref={this.formInstance}
                initialValues={initialValues!}
                onSubmit={this.onSubmit}
            >
                {(formProps) => (
                    <OrderTransactionForm
                        {...formProps}
                    />
                )}
            </Formik>
        );
    }
}