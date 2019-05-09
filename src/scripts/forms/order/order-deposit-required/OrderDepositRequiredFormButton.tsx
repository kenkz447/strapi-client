import { ButtonProps } from 'antd/lib/button';
import * as React from 'react';

import { BusinessController } from '@/business';
import { changeOrderDepositRequired } from '@/business/order';
import { text } from '@/i18n';

import {
    OrderDepositRequiredFormValues
} from './order-deposit-required-form-control';
import {
    OrderDepositRequiredFormControl
} from './OrderDepositRequiredFormControl';

type OrderDepositRequiredFormButtonProps = {
    readonly initialValues?: OrderDepositRequiredFormValues;
    readonly formTitle?: string;
};

export class OrderDepositRequiredFormButton extends React.PureComponent<OrderDepositRequiredFormButtonProps> {
    static readonly defaultProps = {
        formTitle: text('Update deposit amount')
    };

    readonly productForm = React.createRef<OrderDepositRequiredFormControl>();

    public render() {
        const { initialValues, formTitle } = this.props;

        return (
            <BusinessController
                action={changeOrderDepositRequired}
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
                                    title: formTitle,
                                    children: (
                                        <OrderDepositRequiredFormControl
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
                            {formTitle}
                        </a>
                    );
                }}
            </BusinessController>
        );
    }
}