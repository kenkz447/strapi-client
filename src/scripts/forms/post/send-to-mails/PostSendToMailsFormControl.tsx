import { Formik } from 'formik';
import * as React from 'react';

import { FormikControlBase, FormikControlBaseProps } from '@/components';

import {
    PostSendToMailsForm,
    PostSendToMailsFormValues
} from './post-send-to-mails-form-control';

interface PostSendToMailsFormControlProps extends FormikControlBaseProps<PostSendToMailsFormValues> {
    readonly initialValues?: PostSendToMailsFormValues;
}

interface PostSendToMailsFormControlState {
}

export class PostSendToMailsFormControl extends FormikControlBase<
    PostSendToMailsFormValues,
    PostSendToMailsFormControlProps,
    PostSendToMailsFormControlState> {

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
                    <PostSendToMailsForm
                        {...formProps}
                    />
                )}
            </Formik>
        );
    }
}