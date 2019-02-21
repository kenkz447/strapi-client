import { Formik } from 'formik';
import * as React from 'react';

import { FormikControlBase, FormikControlBaseProps } from '@/components';

import { ConfirmForm, ConfirmFormValues } from './confirm-form-control';

interface ConfirmFormControlProps extends FormikControlBaseProps<ConfirmFormValues> {
    readonly initialValues?: ConfirmFormValues;
}

interface ConfirmFormControlState {
}

export class ConfirmFormControl extends FormikControlBase<
    ConfirmFormValues,
    ConfirmFormControlProps,
    ConfirmFormControlState> {

    public render() {
        const { initialValues } = this.props;

        return (
            <Formik
                ref={this.formInstance}
                initialValues={initialValues!}
                onSubmit={this.onSubmit}
            >
                {(formProps) => (
                    <ConfirmForm
                        {...formProps}
                    />
                )}
            </Formik>
        );
    }
}