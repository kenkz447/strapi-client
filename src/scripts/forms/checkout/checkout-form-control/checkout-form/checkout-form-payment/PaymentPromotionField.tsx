import { FormikActions, FormikHandlers } from 'formik';
import debounce from 'lodash/debounce';
import * as React from 'react';

import { FormInput, verticalLayout } from '@/components';
import { text } from '@/i18n';
import { Order, Promotion, promotionResources, request } from '@/restful';

import { CheckoutFormValues } from '../../CheckoutForm';

export interface PaymentPromotionFieldProps {
    readonly value?: Promotion;
    readonly setFieldValue: FormikActions<CheckoutFormValues>['setFieldValue'];
    readonly handleChange: FormikHandlers['handleChange'];
}

export class PaymentPromotionField extends React.PureComponent<PaymentPromotionFieldProps> {

    private readonly trySetPromotion = debounce(
        async () => {
            const { value, setFieldValue } = this.props;
            if (!value) {
                return;
            }

            const promoCodeEntity = await request(
                promotionResources.find,
                {
                    type: 'query',
                    parameter: 'code',
                    value: value!.code
                }
            );

            if (!promoCodeEntity.length) {
                setFieldValue(nameof<Order>(o => o.promotion), { code: value.code });
                return;
            }

            setFieldValue(
                nameof<Order>(o => o.promotion),
                promoCodeEntity[0]
            );
        },
        500
    );

    public componentDidUpdate(prevProps: PaymentPromotionFieldProps) {
        const { value, setFieldValue } = this.props;

        if ((value && value.code) === (prevProps.value && prevProps.value.code)) {
            return;
        }

        if (!value || !value.code) {
            setFieldValue(nameof<Order>(o => o.promotion), null);
        }

        this.trySetPromotion();
    }

    public render() {
        const { value, handleChange } = this.props;

        const isPromoCodeValid = value && value.id;

        return (
            <FormInput
                className="w-50"
                name={nameof.full<Order>(o => o.promotion!.code)}
                onChange={handleChange}
                value={value && value.code}
                wrapperCol={verticalLayout.wrapperCol}
                labelCol={verticalLayout.labelCol}
                validateStatus={isPromoCodeValid ? 'success' : undefined}
                label={text('Promo code')}
                placeholder={text('input your code')}
                autoFocus={!isPromoCodeValid}
            />
        );
    }
}