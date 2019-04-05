import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import * as React from 'react';

import { BusinessController } from '@/business';
import { createInvitation } from '@/business/invitation';
import { text } from '@/i18n';
import { Invitation } from '@/restful';

import { InvitationCreateFormValues } from './invitation-create-form-control';
import { InvitationCreateFormControl } from './InvitationCreateFormControl';

type InvitationCreateFormButtonProps = ButtonProps & {
    readonly initialValues?: InvitationCreateFormValues;
    readonly formTitle?: string;
    readonly onSuccess?: (invitation: Invitation) => void;
};

export class InvitationCreateFormButton extends React.PureComponent<InvitationCreateFormButtonProps> {
    static readonly defaultProps = {
        formTitle: text('Create invitation link'),
        type: 'primary'
    };

    readonly form = React.createRef<InvitationCreateFormControl>();

    public render() {
        const { initialValues, formTitle: label, onSuccess, ...buttonProps } = this.props;

        return (
            <BusinessController
                action={createInvitation}
                onActionBegin={(param, { setContext }) => {
                    setContext({
                        globalModalProgressing: true
                    });
                }}
                onSuccess={(result: Invitation, { setContext }) => {
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
                                        <InvitationCreateFormControl
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