import { Typography } from 'antd';
import { FormikProps } from 'formik';
import * as React from 'react';
import styled from 'styled-components';

import { FormBody, FormInput, FormSubmit } from '@/components';
import { text } from '@/i18n';
import { Account } from '@/restful';

const BusinessInfomationFormWrapper = styled.div`
    display: flex;
    > div {
        flex-grow: 1;
        max-width: 400px;
    }
`;

export type BusinessInfomationFormValues = Partial<Account>;

export interface BusinessInfomationFormProps extends FormikProps<BusinessInfomationFormValues> {
    readonly readOnly?: boolean;
}

export class BusinessInfomationForm extends React.PureComponent<BusinessInfomationFormProps> {
    public render() {
        const {
            values,
            errors,
            handleChange,
            isSubmitting,
            dirty,
            readOnly
        } = this.props;

        return (
            <FormBody formProps={this.props}>
                <BusinessInfomationFormWrapper>
                    <div>
                        <FormInput
                            name={nameof.full<BusinessInfomationFormValues>(o => o.registration_businessAreas)}
                            onChange={handleChange}
                            value={values.registration_businessAreas}
                            validateStatus={errors.registration_businessAreas ? 'error' : undefined}
                            help={errors.registration_businessAreas}
                            label={text('Business areas')}
                            placeholder="..."
                            autoFocus={true}
                            required={true}
                            readOnly={readOnly}
                        />
                        <FormInput
                            name={nameof.full<BusinessInfomationFormValues>(o => o.registration_companyName)}
                            onChange={handleChange}
                            value={values.registration_companyName}
                            validateStatus={errors.registration_companyName ? 'error' : undefined}
                            help={errors.registration_companyName}
                            label={text('Company name')}
                            placeholder="..."
                            required={true}
                            readOnly={readOnly}
                        />
                        <FormInput
                            name={nameof.full<BusinessInfomationFormValues>(o => o.registration_companyAddress)}
                            onChange={handleChange}
                            value={values.registration_companyAddress}
                            validateStatus={errors.registration_companyAddress ? 'error' : undefined}
                            help={errors.registration_companyAddress}
                            label={text('Company address')}
                            placeholder="..."
                            required={true}
                            readOnly={readOnly}
                        />
                    </div>
                </BusinessInfomationFormWrapper>
                <FormSubmit
                    formProps={this.props}
                    disabled={isSubmitting || !dirty}
                >
                    {text('Update')}
                </FormSubmit>
            </FormBody>
        );
    }
}
