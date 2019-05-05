import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import * as React from 'react';

import { BusinessController } from '@/business';
import { blockUser } from '@/business/profile';
import { text } from '@/i18n';
import { Address } from '@/restful';

import { BlockAccountFormValues } from './block-account-form-control';
import { BlockAccountFormControl } from './BlockAccountFormControl';

type BlockAccountFormButtonProps = ButtonProps & {
    readonly initialValues?: BlockAccountFormValues;
    readonly formTitle?: string;
    readonly onSuccess?: (result: Address) => void;
};

export class BlockAccountFormButton extends React.PureComponent<BlockAccountFormButtonProps> {
    static readonly defaultProps = {
        formTitle: text('Block user')
    };

    readonly productForm = React.createRef<BlockAccountFormControl>();

    public render() {
        const { initialValues, formTitle, onSuccess, ...buttonProps } = this.props;

        return (
            <BusinessController
                action={blockUser}
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
                                        <BlockAccountFormControl
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