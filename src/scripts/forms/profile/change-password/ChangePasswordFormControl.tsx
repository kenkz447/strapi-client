import { Formik } from 'formik';
import { RootContext } from 'qoobee';
import * as React from 'react';

import { FormikControlBase, FormikControlBaseProps } from '@/components';
import { WithAuthClient } from '@/domain';

import {
    ChangePassword,
    ChangePasswordFormValues
} from './change-password-form-control';

interface ChangePasswordFormControlProps extends FormikControlBaseProps<ChangePasswordFormValues> {
    
}

export class ChangePasswordFormControl extends FormikControlBase<
    ChangePasswordFormValues,
    ChangePasswordFormControlProps
    > {
    static readonly contextType = RootContext;
    readonly context!: WithAuthClient;

    public render() {
        return (
            <Formik<ChangePasswordFormValues>
                initialValues={this.props.initialValues!}
                onSubmit={this.onSubmit}
                enableReinitialize={true}
            >
                {ChangePassword}
            </Formik>
        );
    }
}