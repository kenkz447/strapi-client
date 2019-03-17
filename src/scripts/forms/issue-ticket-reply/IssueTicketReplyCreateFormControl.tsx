import { Formik } from 'formik';
import * as React from 'react';

import { FormikControlBase, FormikControlBaseProps } from '@/components';

import {
    IssueTicketReplyCreateForm,
    IssueTicketReplyCreateFormValues
} from './issue-ticket-reply-create-form-control';

interface IssueTicketReplyCreateFormControlProps extends FormikControlBaseProps<IssueTicketReplyCreateFormValues> {
    readonly initialValues?: IssueTicketReplyCreateFormValues;
}

interface IssueTicketReplyCreateFormControlState {
    readonly loaded: boolean;
}

export class IssueTicketReplyCreateFormControl extends FormikControlBase<
    IssueTicketReplyCreateFormValues,
    IssueTicketReplyCreateFormControlProps,
    IssueTicketReplyCreateFormControlState> {

    constructor(props: IssueTicketReplyCreateFormControlProps) {
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
                    <IssueTicketReplyCreateForm
                        {...formProps}
                    />
                )}
            </Formik>
        );
    }
}