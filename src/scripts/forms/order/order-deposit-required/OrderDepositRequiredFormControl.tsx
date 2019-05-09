import { Formik } from 'formik';
import * as React from 'react';

import { FormikControlBase, FormikControlBaseProps } from '@/components';

import {
    OrderDepositRequiredForm,
    OrderDepositRequiredFormValues
} from './order-deposit-required-form-control';

interface OrderDepositRequiredFormControlProps extends FormikControlBaseProps<OrderDepositRequiredFormValues> {
    readonly initialValues?: OrderDepositRequiredFormValues;
}

interface OrderDepositRequiredFormControlState {
}

export class OrderDepositRequiredFormControl extends FormikControlBase<
    OrderDepositRequiredFormValues,
    OrderDepositRequiredFormControlProps,
    OrderDepositRequiredFormControlState> {

    public render() {
        const { initialValues } = this.props;

        return (
            <Formik
                ref={this.formInstance}
                initialValues={initialValues!}
                onSubmit={this.onSubmit}
            >
                {(formProps) => (
                    <OrderDepositRequiredForm
                        {...formProps}
                    />
                )}
            </Formik>
        );
    }
}