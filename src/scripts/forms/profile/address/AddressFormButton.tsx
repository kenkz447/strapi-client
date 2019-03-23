import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import * as React from 'react';

import { BusinessController } from '@/business';
import { upsertAddress } from '@/business/address';
import { text } from '@/i18n';
import { Address } from '@/restful';

import { AddressFormValues } from './address-form-control';
import { AddressFormControl } from './AddressFormControl';

type AddressFormButtonProps = ButtonProps & {
    readonly initialValues?: AddressFormValues;
    readonly label?: string;
    readonly onSuccess?: (result: Address) => void;
};

export class AddressFormButton extends React.PureComponent<AddressFormButtonProps> {
    static readonly defaultProps = {
    };

    readonly productForm = React.createRef<AddressFormControl>();

    public render() {
        const { initialValues, label, onSuccess, ...buttonProps } = this.props;

        return (
            <BusinessController
                action={upsertAddress}
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
                                    title: label,
                                    children: (
                                        <AddressFormControl
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