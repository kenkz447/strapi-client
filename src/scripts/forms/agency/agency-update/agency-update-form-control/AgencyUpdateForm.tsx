import { Typography } from 'antd';
import { OptionProps } from 'antd/lib/select';
import { FormikProps } from 'formik';
import * as React from 'react';
import styled from 'styled-components';

import { FormBody, FormInput, FormSubmit } from '@/components';
import { text } from '@/i18n';
import { Agency } from '@/restful';

import { AgencyUpdateCityAndCounty } from './agency-update-form';

const AccountFormWrapper = styled.div`
    max-width: 400px;
`;

export type AgencyUpdateFormValues = Partial<Agency>;

export interface AgencyUpdateFormOwnProps extends FormikProps<AgencyUpdateFormValues> {
    readonly agencyLevelOptions: OptionProps[];
}

export function AgencyUpdateForm(props: AgencyUpdateFormOwnProps) {
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
            <Typography.Title level={4}>
                {text('Agency setting')}
            </Typography.Title>
            <AccountFormWrapper>
                <FormInput
                    name={nameof.full<AgencyUpdateFormValues>(o => o.name)}
                    onChange={handleChange}
                    value={values.name}
                    validateStatus={errors.name ? 'error' : undefined}
                    label={text('Agency name')}
                    placeholder={text('input agency name')}
                    autoFocus={true}
                    required={true}
                />
                <AgencyUpdateCityAndCounty
                    cityError={errors.city}
                    countyError={errors.county}
                    city={values.city}
                    county={values.county}
                    setFieldValue={setFieldValue}
                />
                <FormInput
                    name={nameof.full<AgencyUpdateFormValues>(o => o.address)}
                    onChange={handleChange}
                    value={values.address}
                    validateStatus={errors.address ? 'error' : undefined}
                    label={text('Address')}
                    placeholder={text('input agency address')}
                    required={true}
                />

                <FormSubmit
                    formProps={props}
                    disabled={isSubmitting || !dirty}
                >
                    {text('Update')}
                </FormSubmit>
            </AccountFormWrapper>
        </FormBody>
    );
}