import { Formik } from 'formik';
import * as React from 'react';

import { FormikControlBase, FormikControlBaseProps } from '@/components';

import {
    OrderTransactionRejectForm,
    OrderTransactionRejectFormValues
} from './order-transaction-reject-form-control';

interface OrderTransactionRejectFormControlProps extends FormikControlBaseProps<OrderTransactionRejectFormValues> {
    readonly initialValues?: OrderTransactionRejectFormValues;
}

interface OrderTransactionRejectFormControlState {
}

export class OrderTransactionRejectFormControl extends FormikControlBase<
    OrderTransactionRejectFormValues,
    OrderTransactionRejectFormControlProps,
    OrderTransactionRejectFormControlState> {

    public render() {
        const { initialValues } = this.props;

        return (
            <Formik
                ref={this.formInstance}
                initialValues={initialValues!}
                onSubmit={this.onSubmit}
            >
                {(formProps) => (
                    <OrderTransactionRejectForm
                        {...formProps}
                    />
                )}
            </Formik>
        );
    }
}