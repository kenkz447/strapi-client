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
}

export function AgencyForm(props: AgencyFormOwnProps) {
    const {
        values,
        errors,
        handleChange,
        setFieldValue,
        agencyLevelOptions,
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
            <AgencyCityAndCounty
                cityError={errors.city}
                countyError={errors.county}
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
                help={errors.level ? errors.level['id'] : undefined}
                validateStatus={errors.level ? errors.level['id'] : undefined}
                label={text('Level')}
                placeholder={text('Select level')}
                required={true}
            />
        </FormBody>
    );
}