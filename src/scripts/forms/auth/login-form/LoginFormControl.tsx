import { Formik, FormikBag } from 'formik';
import { RootContext } from 'qoobee';
import * as React from 'react';

import { WithAuthClient } from '@/domain';
import { text } from '@/i18n';

import {
    LoginForm,
    LoginFormOwnProps,
    LoginFormValues
} from './login-form-control';

export class LoginFormControl extends React.PureComponent {
    static readonly contextType = RootContext;
    readonly context!: WithAuthClient;

    public render() {
        return (
            <Formik<LoginFormValues>
                initialValues={{}}
                onSubmit={this.onSubmit}
            >
                {LoginForm}
            </Formik>
        );
    }

    readonly onSubmit = async (
        values: LoginFormValues,
        formiKBag: FormikBag<LoginFormOwnProps, LoginFormValues>
    ) => {
        const { authClient } = this.context;
        try {
            await authClient.login(values);
        } catch (error) {
            formiKBag.setStatus({
                error: text(error.message)
            });
        } finally {
            formiKBag.setSubmitting(false);
        }
    }
}