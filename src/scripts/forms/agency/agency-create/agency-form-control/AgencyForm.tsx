import { OptionProps } from 'antd/lib/select';
import { FormikProps } from 'formik';
import * as React from 'react';

import { FormBody, FormInput, FormSelect, verticalLayout } from '@/components';
import { text } from '@/i18n';
import { Agency } from '@/restful';

import { AgencyCityAndCounty } from './agency-form';

export type AgencyFormValues = Partial<Agency>;

export interface AgencyFormOwnProps extends FormikProps<AgencyFormValues> {
    readonly agencyLevelOptions: OptionProps[];
    readonly agencyTypeOptions: OptionProps[];
}

export function AgencyForm(props: AgencyFormOwnProps) {
    const {
        values,
        errors,
        handleChange,
        setFieldValue,
        agencyLevelOptions,
        agencyTypeOptions
    } = props;

    return (
        <FormBody formProps={props}>
            <FormInput
                name={nameof.full<AgencyFormValues>(o => o.name)}
                onChange={handleChange}
                value={values.name}
                validateStatus={errors.name ? 'error' : undefined}
                wrapperCol={verticalLayout.wrapperCol}
                labelCol={verticalLayout.labelCol}
                label={text('Agency name')}
                placeholder={text('input agency name')}
                autoFocus={true}
                required={true}
            />
            <FormInput
                name={nameof.full<AgencyFormValues>(o => o.email)}
                onChange={handleChange}
                value={values.email}
                validateStatus={errors.email ? 'error' : undefined}
                wrapperCol={verticalLayout.wrapperCol}
                labelCol={verticalLayout.labelCol}
                label={text('Email')}
                placeholder={text('input email')}
                required={true}
                type="email"
            />
            <FormInput
                name={nameof.full<AgencyFormValues>(o => o.phone)}
                onChange={handleChange}
                value={values.phone}
                validateStatus={errors.phone ? 'error' : undefined}
                wrapperCol={verticalLayout.wrapperCol}
                labelCol={verticalLayout.labelCol}
                label={text('Phone')}
                placeholder={text('input phone')}
                required={true}
            />
            <AgencyCityAndCounty<AgencyFormValues>
                cityFieldName={nameof.full<AgencyFormValues>(o => o.city!.id)}
                cityError={errors.city}
                countyError={errors.county}
                countryFieldName={nameof.full<AgencyFormValues>(o => o.county!.id)}
                city={values.city}
                county={values.county}
                setFieldValue={setFieldValue}
            />
            <FormInput
                name={nameof.full<AgencyFormValues>(o => o.address)}
                onChange={handleChange}
                value={values.address}
                validateStatus={errors.address ? 'error' : undefined}
                wrapperCol={verticalLayout.wrapperCol}
                labelCol={verticalLayout.labelCol}
                label={text('Address')}
                placeholder={text('input agency address')}
                required={true}
            />
            <FormSelect
                name={nameof.full<AgencyFormValues>(o => o.level!.id)}
                value={values.level ? values.level.id : undefined}
                setFieldValue={setFieldValue}
                options={agencyLevelOptions}
                wrapperCol={verticalLayout.wrapperCol}
                labelCol={verticalLayout.labelCol}
                help={errors.level ? errors.level || errors.level : undefined}
                validateStatus={errors.level ? 'error' : undefined}
                label={text('Level')}
                placeholder={text('Select level')}
                required={true}
            />
            <FormSelect
                name={nameof.full<AgencyFormValues>(o => o.agencyType!.id)}
                value={values.agencyType
                    ? values.agencyType.id
                    : undefined
                }
                setFieldValue={setFieldValue}
                options={agencyTypeOptions}
                wrapperCol={verticalLayout.wrapperCol}
                labelCol={verticalLayout.labelCol}
                label={text('Type')}
                placeholder={text('Select type')}
            />
        </FormBody>
    );
}