import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import * as React from 'react';

import { BusinessController } from '@/business';
import { rejectOrderTransaction } from '@/business/order-transaction';
import { text } from '@/i18n';

import {
    OrderTransactionRejectFormValues
} from './order-transaction-reject-form-control';
import {
    OrderTransactionRejectFormControl
} from './OrderTransactionRejectFormControl';

type OrderTransactionRejectFormButtonProps = ButtonProps & {
    readonly initialValues?: OrderTransactionRejectFormValues;
    readonly label?: string;
};

export class OrderTransactionRejectFormButton extends React.PureComponent<OrderTransactionRejectFormButtonProps> {
    static readonly defaultProps = {
        label: text('Reject transaction'),
        icon: 'close',
        type: 'danger'
    };

    readonly productForm = React.createRef<OrderTransactionRejectFormControl>();

    public render() {
        const { initialValues, label, ...buttonProps } = this.props;

        return (
            <BusinessController
                action={rejectOrderTransaction}
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
                                    title: label,
                                    children: (
                                        <OrderTransactionRejectFormControl
                                            ref={this.productForm}
                                            initialValues={initialValues}
                                            submit={(formValue) => doBusiness(formValue)}
                                        />
                                    ),
                                    onOk: async () => {
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