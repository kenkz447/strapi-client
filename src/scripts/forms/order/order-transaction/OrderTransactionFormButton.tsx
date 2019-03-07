import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import * as React from 'react';

import { BusinessController } from '@/business';
import { upsertOrderTransaction } from '@/business/order-transaction';
import { text } from '@/i18n';

import { OrderTransactionFormValues } from './order-transaction-form-control';
import { OrderTransactionFormControl } from './OrderTransactionFormControl';

type OrderTransactionFormButtonProps = ButtonProps & {
    readonly initialValues?: OrderTransactionFormValues;
    readonly label?: string;
};

export class OrderTransactionFormButton extends React.PureComponent<OrderTransactionFormButtonProps> {
    static readonly defaultProps = {
        label: text('Add transaction'),
        buttonProps: {
            icon: 'plus',
            type: 'primary'
        }
    };

    readonly productForm = React.createRef<OrderTransactionFormControl>();

    public render() {
        const { initialValues, label, ...buttonProps } = this.props;

        return (
            <BusinessController
                action={upsertOrderTransaction}
                onActionBegin={(param, { setContext }) => {
                    setContext({
                        globalModalProgressing: true
                    });
                }}
                onSuccess={(result, { setContext }) => {
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
                {({ doBusiness, loading, context }) => {
                    const { setContext } = context;
                    return (
                        <Button
                            {...buttonProps}
                            onClick={() => setContext({
                                globalModalVisibled: true,
                                globalModal: {
                                    width: 600,
                                    title: OrderTransactionFormButton.defaultProps.label,
                                    children: (
                                        <OrderTransactionFormControl
                                            ref={this.productForm}
                                            initialValues={initialValues}
                                            submit={(formValue) => doBusiness(formValue)}
                                        />
                                    ),
                                    onOk: async () => {
                                        const { formInstance } = this.productForm.current!;
                                        await formInstance.current!.handleSubmit(undefined);
                                    }
                                }
                            })}
                        >
                            {label}
                        </Button >
                    );
                }}
            </BusinessController>
        );
    }
}