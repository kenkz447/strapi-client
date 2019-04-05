import { Formik } from 'formik';
import * as React from 'react';

import { FormikControlBase, FormikControlBaseProps } from '@/components';

import {
    InvitationCreateForm,
    InvitationCreateFormValues
} from './invitation-create-form-control';

interface InvitationCreateFormControlProps extends FormikControlBaseProps<InvitationCreateFormValues> {
    readonly initialValues?: InvitationCreateFormValues;
}

interface InvitationCreateFormControlState {
    readonly loaded: boolean;
}

export class InvitationCreateFormControl extends FormikControlBase<
    InvitationCreateFormValues,
    InvitationCreateFormControlProps,
    InvitationCreateFormControlState> {

    constructor(props: InvitationCreateFormControlProps) {
        super(props);

        this.state = {
            loaded: false
        };
    }

    public render() {
        const { initialValues } = this.props;

        return (
            <Formik
                ref={this.formInstance}
                initialValues={initialValues!}
                onSubmit={this.onSubmit}
            >
                {(formProps) => (
                    <InvitationCreateForm
                        {...formProps}
                    />
                )}
            </Formik>
        );
    }
}