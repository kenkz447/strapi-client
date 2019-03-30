import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import * as React from 'react';

import { BusinessController } from '@/business';
import { upsertOrderDetail } from '@/business/order-detail';
import { text } from '@/i18n';

import {
    OrderDetailCreateFormValues
} from './order-detail-create-form-control';
import { OrderDetailCreateFormControl } from './OrderDetailCreateFormControl';

type OrderDetailCreateFormButtonProps = ButtonProps & {
    readonly initialValues?: OrderDetailCreateFormValues;
    readonly label?: string;
};

export class OrderDetailCreateFormButton extends React.PureComponent<OrderDetailCreateFormButtonProps> {
    static readonly defaultProps = {
        label: 'Mua sản phẩm',
        icon: 'shopping',
        shape: 'circle-outline',
        size: 'large'
    };

    readonly productForm = React.createRef<OrderDetailCreateFormControl>();

    public render() {
        const { initialValues, label, ...buttonProps } = this.props;

        return (
            <BusinessController
                action={upsertOrderDetail}
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
                                    closable: false,
                                    title: OrderDetailCreateFormButton.defaultProps.label,
                                    width: 400,
                                    okText: text('Add to cart'),
                                    okButtonProps: { size: 'large', className: 'w-100', style: { marginLeft: 0 } },
                                    cancelButtonProps: { style: { display: 'none' } },
                                    children: (
                                        <OrderDetailCreateFormControl
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