import { Formik, FormikBag } from 'formik';
import * as React from 'react';

import { RootContext } from '@/app';
import { WithAuthClient } from '@/domain';

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
            if (error instanceof Error) {
                return void formiKBag.setStatus({
                    error: error.message
                });
            }

            formiKBag.setStatus({
                error: 'Tài khoản hoặc mật khẩu không chính xác!'
            });
        } finally {
            formiKBag.setSubmitting(false);
        }
    }
}