import { FormikActions, FormikHandlers } from 'formik';
import debounce from 'lodash/debounce';
import * as React from 'react';

import { FormInput, verticalLayout } from '@/components';
import { text } from '@/i18n';
import { Order, Promotion, promotionResources, request } from '@/restful';
import { formatCurrency } from '@/utilities';

import { CheckoutFormValues } from '../../CheckoutForm';

export interface PaymentPromotionFieldProps {
    readonly value?: Promotion;
    readonly setFieldValue: FormikActions<CheckoutFormValues>['setFieldValue'];
    readonly handleChange: FormikHandlers['handleChange'];
}

interface PaymentPromotionFieldState {
    readonly currentCode?: string;
}

export class PaymentPromotionField extends React.PureComponent<
    PaymentPromotionFieldProps,
    PaymentPromotionFieldState
    > {

    constructor(props: PaymentPromotionFieldProps) {
        super(props);

        this.state = {};
    }

    private readonly trySetPromotion = debounce(
        async () => {
            const { setFieldValue } = this.props;
            const { currentCode } = this.state;

            if (!currentCode || currentCode.length < 5) {
                setFieldValue(
                    nameof<Order>(o => o.promotion),
                    null
                );

                return;
            }

            const promoCodeEntity = await request(
                promotionResources.find,
                {
                    type: 'query',
                    parameter: 'code',
                    value: currentCode
                }
            );

            setFieldValue(
                nameof<Order>(o => o.promotion),
                promoCodeEntity[0] || null
            );
        },
        500
    );

    public componentDidUpdate(prevProps: PaymentPromotionFieldProps) {
        const { currentCode } = this.state;

        if (currentCode) {
            this.trySetPromotion();
        }
    }

    private readonly isCurrentPromoCodeValid = () => {
        const { value } = this.props;

        return value && !!value.id;
    }

    private readonly getHelpMessage = () => {
        const { value } = this.props;
        const isPromoCodeValid = this.isCurrentPromoCodeValid();

        if (!isPromoCodeValid) {
            return '';
        }

        if (value!.discountPercent) {
            return text(`Bạn được giảm ${value!.discountPercent}%`);
        }

        return text(`Bạn được giảm ${formatCurrency(value!.discountPrice)}`);
    }

    private readonly onInputChange = (e) => {
        this.setState({
            currentCode: e.target.value
        });
    }

    public render() {
        const { currentCode } = this.state;

        const isPromoCodeValid = this.isCurrentPromoCodeValid();

        return (
            <FormInput
                className="w-50"
                name={nameof.full<Order>(o => o.promotion!.code)}
                onChange={this.onInputChange}
                value={currentCode}
                wrapperCol={verticalLayout.wrapperCol}
                labelCol={verticalLayout.labelCol}
                validateStatus={isPromoCodeValid ? 'success' : undefined}
                label={text('Promo code')}
                placeholder={text('input your code')}
                autoFocus={!isPromoCodeValid}
                help={this.getHelpMessage()}
            />
        );
    }
}