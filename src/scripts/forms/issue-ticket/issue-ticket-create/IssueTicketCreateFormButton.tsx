import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import * as React from 'react';

import { BusinessController } from '@/business';
import { createIssueTicket } from '@/business/issue-ticket';
import { text } from '@/i18n';
import { IssueTicket } from '@/restful';

import {
    IssueTicketCreateFormValues
} from './issue-ticket-create-form-control';
import { IssueTicketCreateFormControl } from './IssueTicketCreateFormControl';

type IssueTicketCreateFormButtonProps = ButtonProps & {
    readonly initialValues?: IssueTicketCreateFormValues;
    readonly label?: string;
    readonly onSuccess?: (issueTicket: IssueTicket) => void;
};

export class IssueTicketCreateFormButton extends React.PureComponent<IssueTicketCreateFormButtonProps> {
    static readonly defaultProps = {
        label: text('New Request'),
    };

    readonly form = React.createRef<IssueTicketCreateFormControl>();

    public render() {
        const { initialValues, label, onSuccess, ...buttonProps } = this.props;

        return (
            <BusinessController
                action={createIssueTicket}
                onActionBegin={(param, { setContext }) => {
                    setContext({
                        globalModalProgressing: true
                    });
                }}
                onSuccess={(result: IssueTicket, { setContext }) => {
                    if (onSuccess) {
                        onSuccess(result);
                    }

                    setContext({
                        globalModalVisibled: false,
                        globalModalProgressing: false
                    });
                }}
                onFail={(errors, { setContext }) => {
                    setContext({
                        globalModalProgressing: false
                    });
                }}
            >
                {({ doBusiness, context }) => {
                    const { setContext } = context;
                    return (
                        <Button
                            {...buttonProps}
                            onClick={() => setContext({
                                globalModalVisibled: true,
                                globalModal: {
                                    closable: false,
                                    title: label,
                                    children: (
                                        <IssueTicketCreateFormControl
                                            ref={this.form}
                                            initialValues={initialValues}
                                            submit={(formValue) => doBusiness(formValue)}
                                        />
                                    ),
                                    onOk: async () => {
                                        const { formInstance } = this.form.current!;
                                        formInstance.current!.handleSubmit(undefined);
                                    }
                                }
                            })}
                        />
                    );
                }}
            </BusinessController>
        );
    }
}