import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import * as React from 'react';

import { BusinessController } from '@/business';
import { upsertOrder } from '@/business/order';
import { text } from '@/i18n';

import { OrderFormValues } from './order-form-control';
import { OrderFormControl } from './OrderFormControl';

type OrderFormButtonProps = ButtonProps & {
    readonly initialValues?: OrderFormValues;
    readonly label?: string;
};

export class OrderFormButton extends React.PureComponent<OrderFormButtonProps> {
    static readonly defaultProps = {
        label: text('Update order'),
        buttonProps: {
            icon: 'plus',
            type: 'primary'
        }
    };

    readonly productForm = React.createRef<OrderFormControl>();

    public render() {
        const { initialValues, label, ...buttonProps } = this.props;

        return (
            <BusinessController
                action={upsertOrder}
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
                                    title: OrderFormButton.defaultProps.label,
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
                        </Button >
                    );
                }}
            </BusinessController>
        );
    }
}