import { Formik } from 'formik';
import { RootContext } from 'qoobee';
import * as React from 'react';

import { FormikControlBase, FormikControlBaseProps } from '@/components';
import { WithAuthClient } from '@/domain';

import {
    ResetPassword,
    ResetPasswordFormValues
} from './reset-password-form-control';

interface ResetPasswordControlProps extends FormikControlBaseProps<ResetPasswordFormValues> {
    
}

export class ResetPasswordControl extends FormikControlBase<
    ResetPasswordFormValues,
    ResetPasswordControlProps
    > {
    static readonly contextType = RootContext;
    readonly context!: WithAuthClient;

    public render() {
        return (
            <Formik<ResetPasswordFormValues>
                initialValues={this.props.initialValues!}
                onSubmit={this.onSubmit}
            >
                {ResetPassword}
            </Formik>
        );
    }
}