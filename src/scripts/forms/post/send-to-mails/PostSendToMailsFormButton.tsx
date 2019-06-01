import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import * as React from 'react';

import { BusinessController } from '@/business';
import { sendPostToMails } from '@/business/post';
import { text } from '@/i18n';
import { Address } from '@/restful';

import { PostSendToMailsFormValues } from './post-send-to-mails-form-control';
import { PostSendToMailsFormControl } from './PostSendToMailsFormControl';

type PostSendToMailsFormButtonProps = ButtonProps & {
    readonly initialValues?: PostSendToMailsFormValues;
    readonly formTitle?: string;
    readonly onSuccess?: (result: Address) => void;
};

export class PostSendToMailsFormButton extends React.PureComponent<PostSendToMailsFormButtonProps> {
    static readonly defaultProps = {
        formTitle: text('Send post to mails...')
    };

    readonly productForm = React.createRef<PostSendToMailsFormControl>();

    public render() {
        const { initialValues, formTitle, onSuccess, ...buttonProps } = this.props;

        return (
            <BusinessController
                action={sendPostToMails}
                onActionBegin={(param, { setContext }) => {
                    setContext({
                        globalModalProgressing: true
                    });
                }}
                onSuccess={(result: Address, { setContext }) => {
                    setContext({
                        globalModalVisibled: false,
                        globalModalProgressing: false
                    });
                    if (onSuccess) {
                        onSuccess(result);
                    }
                }}
                onFail={(errors, { setContext }) => {
                    setContext({
                        globalModalProgressing: false
                    });
                }}
            >
                {({ doBusiness, loading, context }) => {
                    const { setContext } = context;
                    return (
                        <Button
                            {...buttonProps}
                            onClick={() => setContext({
                                globalModalVisibled: true,
                                globalModal: {
                                    title: formTitle,
                                    children: (
                                        <PostSendToMailsFormControl
                                            ref={this.productForm}
                                            initialValues={initialValues}
                                            submit={(formValue) => doBusiness(formValue)}
                                        />
                                    ),
                                    onOk: () => {
                                        const { formInstance } = this.productForm.current!;
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