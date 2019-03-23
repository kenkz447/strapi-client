import { Button, Divider, Form, Radio } from 'antd';
import * as React from 'react';

import {
    FormInput,
    FormRadioGroup,
    FormSelect,
    verticalLayout,
    verticalLayoutNoLabel
} from '@/components';
import { text } from '@/i18n';
import { Address, Order } from '@/restful';

import { CheckoutFormOwnProps } from '../CheckoutForm';
import { AddressCityAndCounty } from './checout-form-address';
import { AddressBook } from './checout-form-address/AddressBook';

interface CheckoutFormAddressProps extends CheckoutFormOwnProps {
    readonly onNextClick: () => void;
}

export class CheckoutFormAddress extends React.PureComponent<CheckoutFormAddressProps> {

    private readonly onAddressSelect = (address: Address) => {
        const { setFieldValue } = this.props;

        setFieldValue(nameof<Order>(o => o.addressType), address.type);
        setFieldValue(nameof<Order>(o => o.phone), address.phone);
        setFieldValue(nameof<Order>(o => o.email), address.email);
        setFieldValue(nameof<Order>(o => o.shippingToCity), address.city);
        setFieldValue(nameof<Order>(o => o.shippingToCounty), address.county);
        setFieldValue(nameof<Order>(o => o.shippingAddress), address.fullAddress);
        setFieldValue(nameof<Order>(o => o.addressType), address.type);
    }

    public render() {
        const {
            setFieldValue,
            handleChange,
            values,
            errors,
            onNextClick,
            resetForm
        } = this.props;

        const isValid = !!(values.phone
            && values.email
            && values.shippingToCity
            && values.shippingToCounty
            && values.shippingAddress);

        return (
            <div>
                <AddressBook onAddressSelect={this.onAddressSelect} />
                <Divider dashed={true} />
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
                    <Button
                        onClick={() => resetForm()}
                    >
                        {text('Clear')}
                    </Button>
                </Form.Item>
            </div>
        );
    }
}