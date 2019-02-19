import { Button, Form, Radio } from 'antd';
import * as React from 'react';

import {
    FormInput,
    FormRadioGroup,
    FormSelect,
    verticalLayout,
    verticalLayoutNoLabel
} from '@/components';
import { text } from '@/i18n';
import { Order } from '@/restful';

import { CheckoutFormOwnProps } from '../CheckoutForm';
import { AddressCityAndCounty } from './checout-form-address';

interface CheckoutFormAddressProps extends CheckoutFormOwnProps {
    readonly onNextClick: () => void;
}

export class CheckoutFormAddress extends React.PureComponent<CheckoutFormAddressProps> {
    public render() {
        const {
            setFieldValue,
            handleChange,
            values,
            errors,
            onNextClick
        } = this.props;

        const isValid = !!(values.phone
            && values.email
            && values.shippingToCity
            && values.shippingToCounty
            && values.shippingAddress);
        
        return (
            <div>
                <FormInput
                    name={nameof<Order>(o => o.phone)}
                    onChange={handleChange}
                    value={values.phone}
                    wrapperCol={verticalLayout.wrapperCol}
                    labelCol={verticalLayout.labelCol}
                    help={errors.phone}
                    validateStatus={errors.phone ? 'error' : undefined}
                    label={text('Điện thoại')}
                    placeholder={text('Nhập số điện thoại')}
                    required={true}
                    autoFocus={true}
                />
                <FormInput
                    name={nameof<Order>(o => o.email)}
                    onChange={handleChange}
                    value={values.email}
                    wrapperCol={verticalLayout.wrapperCol}
                    labelCol={verticalLayout.labelCol}
                    help={errors.email}
                    validateStatus={errors.email ? 'error' : undefined}
                    label={text('Email')}
                    placeholder={text('Nhập email')}
                    required={true}
                />
                <AddressCityAndCounty
                    cityError={errors.shippingToCity}
                    countyError={errors.shippingToCounty}
                    city={values.shippingToCity}
                    county={values.shippingToCounty}
                    setFieldValue={setFieldValue}
                />
                <FormInput
                    name={nameof<Order>(o => o.shippingAddress)}
                    onChange={handleChange}
                    value={values.shippingAddress}
                    wrapperCol={verticalLayout.wrapperCol}
                    labelCol={verticalLayout.labelCol}
                    help={errors.shippingAddress}
                    validateStatus={errors.shippingAddress ? 'error' : undefined}
                    label={text('Địa chỉ')}
                    placeholder={text('Nhập địa chỉ')}
                    required={true}
                    autoFocus={true}
                />
                <FormRadioGroup
                    name={nameof<Order>(o => o.addressType)}
                    value={values.addressType}
                    onChange={handleChange}
                    wrapperCol={verticalLayout.wrapperCol}
                    labelCol={verticalLayout.labelCol}
                    label={text('Loại địa chỉ')}
                >
                    <Radio value="home">{text('Home')}</Radio>
                    <Radio value="apartment">{text('Apartment')}</Radio>
                </FormRadioGroup>
                <Form.Item
                    wrapperCol={verticalLayoutNoLabel.wrapperCol}
                >
                    <Button
                        type="primary"
                        onClick={onNextClick}
                        disabled={!isValid}
                    >
                        {text('Next')}
                    </Button>
                </Form.Item>
            </div>
        );
    }
}