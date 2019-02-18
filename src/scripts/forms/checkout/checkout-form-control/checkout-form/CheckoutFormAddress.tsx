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
                <FormSelect
                    name={nameof<Order>(o => o.shippingToCity.id)}
                    value={values.shippingToCity && values.shippingToCity.id}
                    setFieldValue={setFieldValue}
                    options={[]}
                    wrapperCol={verticalLayout.wrapperCol}
                    labelCol={verticalLayout.labelCol}
                    help={errors.shippingToCity}
                    validateStatus={errors.shippingToCity ? 'error' : undefined}
                    label={text('Thành phố')}
                    placeholder={text('Chọn thành phố')}
                    required={true}
                />
                <FormSelect
                    name={nameof<Order>(o => o.shippingToCounty.id)}
                    value={values.shippingToCounty && values.shippingToCounty.id}
                    setFieldValue={setFieldValue}
                    options={[]}
                    wrapperCol={verticalLayout.wrapperCol}
                    labelCol={verticalLayout.labelCol}
                    help={errors.shippingToCounty}
                    validateStatus={errors.shippingToCounty ? 'error' : undefined}
                    label={text('Quận huyện')}
                    placeholder={text('Chọn quận huyện')}
                    required={true}
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
                    <Button type="primary" onClick={onNextClick}>{text('Next')}</Button>
                </Form.Item>
            </div>
        );
    }
}