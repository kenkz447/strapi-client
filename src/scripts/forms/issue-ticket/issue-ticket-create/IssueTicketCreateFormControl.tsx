import { Formik } from 'formik';
import * as React from 'react';

import { FormikControlBase, FormikControlBaseProps } from '@/components';

import {
    IssueTicketCreateForm,
    IssueTicketCreateFormValues
} from './issue-ticket-create-form-control';

interface IssueTicketCreateFormControlProps extends FormikControlBaseProps<IssueTicketCreateFormValues> {
    readonly initialValues?: IssueTicketCreateFormValues;
}

interface IssueTicketCreateFormControlState {
    readonly loaded: boolean;
}

export class IssueTicketCreateFormControl extends FormikControlBase<
    IssueTicketCreateFormValues,
    IssueTicketCreateFormControlProps,
    IssueTicketCreateFormControlState> {

    constructor(props: IssueTicketCreateFormControlProps) {
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
                    <IssueTicketCreateForm
                        {...formProps}
                    />
                )}
            </Formik>
        );
    }
}