import { Col, Radio, Row, Typography } from 'antd';
import { FormikProps } from 'formik';
import * as React from 'react';
import styled from 'styled-components';

import { FormBody, FormInput, FormRadioGroup, FormSubmit } from '@/components';
import { text } from '@/i18n';
import { Address } from '@/restful';

import { AgencyUpdateCityAndCounty } from './address-form';

const AccountFormWrapper = styled.div`
    display: block;
`;

export type AddressFormValues = Partial<Address>;

export interface AddressFormOwnProps extends FormikProps<AddressFormValues> {
}

export function AddressForm(props: AddressFormOwnProps) {
    const {
        values,
        errors,
        handleChange,
        setFieldValue,
        isSubmitting,
        dirty
    } = props;

    return (
        <FormBody formProps={props}>
            <AccountFormWrapper>
                <FormInput
                    name={nameof.full<AddressFormValues>(o => o.consigneeName)}
                    onChange={handleChange}
                    value={values.consigneeName}
                    validateStatus={errors.consigneeName ? 'error' : undefined}
                    label={text('Consignee name')}
                    placeholder={text('Input consignee name')}
                    autoFocus={true}
                    required={true}
                />
                <Row gutter={15}>
                    <Col span={12}>
                        <FormInput
                            name={nameof.full<AddressFormValues>(o => o.phone)}
                            onChange={handleChange}
                            value={values.phone}
                            validateStatus={errors.phone ? 'error' : undefined}
                            label={text('Phone')}
                            placeholder={text('input phone')}
                        />
                    </Col>
                    <Col span={12}>
                        <FormInput
                            name={nameof.full<AddressFormValues>(o => o.email)}
                            onChange={handleChange}
                            value={values.email}
                            validateStatus={errors.email ? 'error' : undefined}
                            label={text('Email')}
                            placeholder={text('input email')}
                        />
                    </Col>
                </Row>
                <AgencyUpdateCityAndCounty
                    cityError={errors.city}
                    countyError={errors.county}
                    city={values.city}
                    county={values.county}
                    setFieldValue={setFieldValue}
                />
                <FormInput
                    name={nameof.full<AddressFormValues>(o => o.fullAddress)}
                    onChange={handleChange}
                    value={values.fullAddress}
                    validateStatus={errors.fullAddress ? 'error' : undefined}
                    label={text('Address')}
                    placeholder={text('input address')}
                    required={true}
                />
                <FormRadioGroup
                    name={nameof<AddressFormValues>(o => o.type)}
                    value={values.type}
                    onChange={handleChange}
                    label={text('Address type')}
                    required={true}
                >
                    <Radio value="house">{text('House')}</Radio>
                    <Radio value="apartment">{text('Apartment')}</Radio>
                </FormRadioGroup>
            </AccountFormWrapper>
        </FormBody>
    );
}