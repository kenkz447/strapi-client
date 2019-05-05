import { Formik } from 'formik';
import * as React from 'react';

import { FormikControlBase, FormikControlBaseProps } from '@/components';

import {
    BlockAccountForm,
    BlockAccountFormValues
} from './block-account-form-control';

interface BlockAccountFormControlProps extends FormikControlBaseProps<BlockAccountFormValues> {
    readonly initialValues?: BlockAccountFormValues;
}

interface BlockAccountFormControlState {
}

export class BlockAccountFormControl extends FormikControlBase<
    BlockAccountFormValues,
    BlockAccountFormControlProps,
    BlockAccountFormControlState> {

    public render() {
        const { initialValues } = this.props;

        return (
            <Formik
                ref={this.formInstance}
                initialValues={initialValues!}
                onSubmit={this.onSubmit}
                enableReinitialize={true}
            >
                {(formProps) => (
                    <BlockAccountForm
                        {...formProps}
                    />
                )}
            </Formik>
        );
    }
}