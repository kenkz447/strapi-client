import { FormikHandlers } from 'formik';
import * as React from 'react';

import { FormInput, verticalLayout } from '@/components';
import { text } from '@/i18n';
import { Order, Promotion } from '@/restful';

export interface PaymentPromotionFieldProps {
    readonly error?: string;
    readonly value?: Promotion;
    readonly handleChange: FormikHandlers['handleChange'];
}

export class PaymentPromotionField extends React.PureComponent<PaymentPromotionFieldProps> {
    public render() {
        const { error, value, handleChange } = this.props;
        return (
            <FormInput
                className="w-50"
                name={nameof<Order>(o => o.promotion!.id)}
                onChange={handleChange}
                value={value && value.id}
                wrapperCol={verticalLayout.wrapperCol}
                labelCol={verticalLayout.labelCol}
                help={error}
                validateStatus={error ? 'error' : undefined}
                label={text('Promo code')}
                placeholder={text('input your code')}
                autoFocus={true}
            />
        );
    }
}
