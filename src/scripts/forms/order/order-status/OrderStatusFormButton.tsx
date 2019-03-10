import { ButtonProps } from 'antd/lib/button';
import * as React from 'react';

import { BusinessController } from '@/business';
import { changeOrderStatus, upsertOrder } from '@/business/order';
import { text } from '@/i18n';

import { OrderStatusFormValues } from './order-status-form-control';
import { OrderFormControl } from './OrderStatusFormControl';

type OrderStatusFormButtonProps = ButtonProps & {
    readonly initialValues?: OrderStatusFormValues;
    readonly label?: string;
};

export class OrderStatusFormButton extends React.PureComponent<OrderStatusFormButtonProps> {
    static readonly defaultProps = {
        label: text('Update status')
    };

    readonly productForm = React.createRef<OrderFormControl>();

    public render() {
        const { initialValues, label } = this.props;

        return (
            <BusinessController
                action={changeOrderStatus}
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
                        <a
                            onClick={() => setContext({
                                globalModalVisibled: true,
                                globalModal: {
                                    title: OrderStatusFormButton.defaultProps.label,
                                    children: (
                                        <OrderFormControl
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
                        </a>
                    );
                }}
            </BusinessController>
        );
    }
}