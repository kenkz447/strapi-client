import { ButtonProps } from 'antd/lib/button';
import * as React from 'react';

import { BusinessController } from '@/business';
import { changeOrderDeliveryDate } from '@/business/order';
import { text } from '@/i18n';

import {
    OrderDeliveryDateFormValues
} from './order-delivery-date-form-control';
import { OrderDeliveryDateFormControl } from './OrderDeliveryDateFormControl';

type OrderDeliveryDateFormButtonProps = ButtonProps & {
    readonly initialValues?: OrderDeliveryDateFormValues;
    readonly label?: string;
};

export class OrderDeliveryDateFormButton extends React.PureComponent<OrderDeliveryDateFormButtonProps> {
    static readonly defaultProps = {
        label: text('Update delivery date')
    };

    readonly productForm = React.createRef<OrderDeliveryDateFormControl>();

    public render() {
        const { initialValues, label } = this.props;

        return (
            <BusinessController
                action={changeOrderDeliveryDate}
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
                                    title: OrderDeliveryDateFormButton.defaultProps.label,
                                    children: (
                                        <OrderDeliveryDateFormControl
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
                        >
                            {label}
                        </a>
                    );
                }}
            </BusinessController>
        );
    }
}