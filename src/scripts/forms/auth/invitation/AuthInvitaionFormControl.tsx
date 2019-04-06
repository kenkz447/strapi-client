import { Formik } from 'formik';
import * as React from 'react';

import { FormikControlBase, FormikControlBaseProps } from '@/components';

import {
    AuthInvitaionForm,
    AuthInvitaionFormValues
} from './auth-invitation-form-control';

interface AuthInvitaionFormControlProps extends FormikControlBaseProps<AuthInvitaionFormValues> {
    readonly initialValues?: AuthInvitaionFormValues;
}

interface AuthInvitaionFormControlState {
}

export class AuthInvitaionFormControl extends FormikControlBase<
    AuthInvitaionFormValues,
    AuthInvitaionFormControlProps,
    AuthInvitaionFormControlState> {

    public render() {
        const { initialValues } = this.props;

        return (
            <Formik
                ref={this.formInstance}
                initialValues={initialValues!}
                onSubmit={this.onSubmit}
            >
                {(formProps) => (
                    <AuthInvitaionForm
                        {...formProps}
                    />
                )}
            </Formik>
        );
    }
}