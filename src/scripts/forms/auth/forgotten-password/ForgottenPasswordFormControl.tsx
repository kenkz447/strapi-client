import { Formik, FormikBag } from 'formik';
import { RootContext } from 'qoobee';
import * as React from 'react';

import { FormikControlBase, FormikControlBaseProps } from '@/components';
import { WithAuthClient } from '@/domain';

import {
    ForgottenPassword,
    ForgottenPasswordFormOwnProps,
    ForgottenPasswordFormValues
} from './forgotten-password-form-control';

interface ForgottenPasswordControlProps extends FormikControlBaseProps<ForgottenPasswordFormValues> {

}

export class ForgottenPasswordControl extends FormikControlBase<
    ForgottenPasswordFormValues,
    ForgottenPasswordControlProps
    > {
    static readonly contextType = RootContext;
    readonly context!: WithAuthClient;

    public render() {
        return (
            <Formik<ForgottenPasswordFormValues>
                initialValues={{}}
                onSubmit={this.onSubmit}
            >
                {ForgottenPassword}
            </Formik>
        );
    }
}