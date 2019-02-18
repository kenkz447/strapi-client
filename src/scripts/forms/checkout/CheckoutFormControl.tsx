import { Formik } from 'formik';
import * as React from 'react';

import { FormikControlBase, FormikControlBaseProps } from '@/components';

import { CheckoutForm, CheckoutFormValues } from './checkout-form-control';

interface CheckoutFormControlProps extends FormikControlBaseProps<CheckoutFormValues> {
    readonly initialValues?: CheckoutFormValues;
}

interface CheckoutFormControlState {
}

export class CheckoutFormControl extends FormikControlBase<
    CheckoutFormValues,
    CheckoutFormControlProps,
    CheckoutFormControlState> {

    public render() {
        const { initialValues } = this.props;

        return (
            <Formik
                ref={this.formInstance}
                initialValues={initialValues!}
                onSubmit={this.onSubmit}
            >
                {(formProps) => (
                    <CheckoutForm
                        {...formProps}
                    />
                )}
            </Formik>
        );
    }
}