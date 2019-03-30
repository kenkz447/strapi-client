import { OptionProps } from 'antd/lib/select';
import { Formik } from 'formik';
import * as React from 'react';

import { getOrderTotalPayment } from '@/business/order';
import { FormikControlBase, FormikControlBaseProps } from '@/components';
import {
    Address,
    addressResources,
    City,
    cityResources,
    request
} from '@/restful';

import { CheckoutForm, CheckoutFormValues } from './checkout-form-control';
import {
    CheckoutFormContext
} from './checkout-form-control/CheckoutFormContext';

interface CheckoutFormControlProps extends FormikControlBaseProps<CheckoutFormValues> {
    readonly initialValues?: CheckoutFormValues;
}

interface CheckoutFormControlState {
    readonly cities: City[];
    readonly cityOptions: OptionProps[];
    readonly addresses: Address[];
    readonly addressOptions: OptionProps[];
}

export class CheckoutFormControl extends FormikControlBase<
    CheckoutFormValues,
    CheckoutFormControlProps,
    CheckoutFormControlState> {

    constructor(props: CheckoutFormControlProps) {
        super(props);
        this.state = {
            cities: [],
            cityOptions: [],
            addressOptions: [],
            addresses: []
        };

        this.fetchResources();
    }

    private readonly fetchResources = async () => {
        const [cities, addresses] = await Promise.all([
            request(cityResources.find),
            request(addressResources.find)
        ]);

        this.setState({
            cities,
            cityOptions: this.listToOptions(cities),
            addresses: addresses,
            addressOptions: this.listToOptions(addresses)
        });
    }

    readonly beforeSubmit = async (values: CheckoutFormValues): Promise<CheckoutFormValues> => {
        const orderTotal = getOrderTotalPayment(values)!;

        const {
            discounts,
            totalPayment,
            transportFee,
            subTotal
        } = orderTotal;

        return {
            ...values,
            agencyCommissionPercent: discounts.agency.percent,
            agencyCommissionValue: discounts.agency.discount,
            shippingFee: transportFee ? transportFee.total : 0,
            promotionDiscount: discounts.promotion,
            totalDiscount: discounts.total,
            totalPrice: subTotal,
            totalOfPayment: totalPayment,
        };
    }

    public render() {
        const {
            initialValues
        } = this.props;

        const { cities, cityOptions, addressOptions, addresses } = this.state;

        return (
            <CheckoutFormContext.Provider
                value={{
                    cities,
                    cityOptions,
                    addresses,
                    addressOptions
                }}
            >
                <Formik
                    ref={this.formInstance}
                    initialValues={initialValues!}
                    onSubmit={this.onSubmit}
                >
                    {(formProps) => (
                        <CheckoutForm
                            {...formProps}
                        />
                    )}
                </Formik>
            </CheckoutFormContext.Provider>
        );
    }
}