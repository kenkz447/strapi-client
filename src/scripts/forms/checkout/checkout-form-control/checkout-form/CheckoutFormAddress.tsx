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

        setFieldValue(nameof<Order>(o => o.consigneeName), address.consigneeName);
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

        const isValid = !!(
            values.consigneeName
            && values.phone
            && values.email
            && values.shippingToCity
            && values.shippingToCounty
            && values.shippingAddress
            && values.addressType
        );

        return (
            <div>
                <AddressBook onAddressSelect={this.onAddressSelect} />
                <Divider dashed={true} />
                <FormInput
                    name={nameof<Order>(o => o.consigneeName)}
                    onChange={handleChange}
                    value={values.consigneeName}
                    wrapperCol={verticalLayout.wrapperCol}
                    labelCol={verticalLayout.labelCol}
                    help={errors.consigneeName}
                    validateStatus={errors.consigneeName ? 'error' : undefined}
                    label={text('Consignee')}
                    placeholder={text('input consignee')}
                    required={true}
                />
                <FormInput
                    name={nameof<Order>(o => o.phone)}
                    onChange={handleChange}
                    value={values.phone}
                    wrapperCol={verticalLayout.wrapperCol}
                    labelCol={verticalLayout.labelCol}
                    help={errors.phone}
                    validateStatus={errors.phone ? 'error' : undefined}
                    label={text('Phone')}
                    placeholder={text('input phone')}
                    required={true}
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
                    placeholder={text('input email')}
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
                    label={text('Address')}
                    placeholder={text('input address')}
                    required={true}
                />
                <FormRadioGroup
                    name={nameof<Order>(o => o.addressType)}
                    value={values.addressType}
                    onChange={handleChange}
                    wrapperCol={verticalLayout.wrapperCol}
                    labelCol={verticalLayout.labelCol}
                    label={text('Address type')}
                >
                    <Radio value="house">{text('House')}</Radio>
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