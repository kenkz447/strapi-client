import { Formik } from 'formik';
import * as React from 'react';

import { FormikControlBase, FormikControlBaseProps } from '@/components';

import { AccountForm, AccountFormValues } from './account-form-control';

interface AccountFormControlProps extends FormikControlBaseProps<AccountFormValues> {
    readonly initialValues?: AccountFormValues;
}

interface AccountFormControlState {
}

export class AccountFormControl extends FormikControlBase<
    AccountFormValues,
    AccountFormControlProps,
    AccountFormControlState> {

    public render() {
        const { initialValues } = this.props;

        return (
            <Formik
                ref={this.formInstance}
                initialValues={initialValues!}
                onSubmit={this.onSubmit}
            >
                {(formProps) => (
                    <AccountForm
                        {...formProps}
                    />
                )}
            </Formik>
        );
    }
}