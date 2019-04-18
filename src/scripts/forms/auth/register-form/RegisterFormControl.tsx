import { Formik } from 'formik';
import * as React from 'react';

import { FormikControlBase, FormikControlBaseProps } from '@/components';

import { RegisterForm, RegisterFormValues } from './register-form-control';

interface RegisterFormControlProps extends FormikControlBaseProps<RegisterFormValues> {

}

interface RegisterFormControlState {
}

export class RegisterFormControl extends FormikControlBase<
    RegisterFormValues,
    RegisterFormControlProps,
    RegisterFormControlState> {

    public render() {
        const { initialValues } = this.props;

        return (
            <Formik
                ref={this.formInstance}
                initialValues={initialValues!}
                onSubmit={this.onSubmit}
            >
                {(formProps) => (
                    <RegisterForm
                        {...formProps}
                    />
                )}
            </Formik>
        );
    }
}