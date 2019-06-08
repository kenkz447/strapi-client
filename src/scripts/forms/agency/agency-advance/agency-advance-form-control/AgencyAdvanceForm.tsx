import { OptionProps } from 'antd/lib/select';
import { FormikProps } from 'formik';
import * as React from 'react';
import styled from 'styled-components';

import { FormBody, FormSelect, verticalLayout } from '@/components';
import { text } from '@/i18n';
import { Agency } from '@/restful';

const AccountFormWrapper = styled.div`
    max-width: 400px;
`;

export type AgencyAdvanceFormValues = Partial<Agency>;

export interface AgencyAdvanceFormOwnProps extends FormikProps<AgencyAdvanceFormValues> {
    readonly agencyLevelOptions: OptionProps[];
    readonly agencyTypeOptions: OptionProps[];
}

export function AgencyAdvanceForm(props: AgencyAdvanceFormOwnProps) {
    const {
        values,
        errors,
        setFieldValue,
        agencyLevelOptions,
        agencyTypeOptions
    } = props;

    return (
        <FormBody formProps={props}>
            <AccountFormWrapper>
                <FormSelect
                    name={nameof.full<AgencyAdvanceFormValues>(o => o.level!.id)}
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
                    name={nameof.full<AgencyAdvanceFormValues>(o => o.agencyType!.id)}
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
            </AccountFormWrapper>
        </FormBody>
    );
}