import { Typography } from 'antd';
import { FormikProps } from 'formik';
import * as React from 'react';
import styled from 'styled-components';

import { FormBody, FormInput, FormSubmit } from '@/components';
import { text } from '@/i18n';
import { Account } from '@/restful';

const AccountFormWrapper = styled.div`
    display: flex;
    > div {
        flex-grow: 1;
        max-width: 400px;
    }
`;

export type AccountFormValues = Partial<Account>;

export interface AccountFormProps extends FormikProps<AccountFormValues> {
}

export class AccountForm extends React.PureComponent<AccountFormProps> {
    public render() {
        const {
            values,
            errors,
            setFieldValue,
            handleChange,
            isSubmitting,
            dirty
        } = this.props;

        return (
            <FormBody formProps={this.props}>
                <Typography.Title level={4}>
                    {text('Account setting')}
                </Typography.Title>
                <AccountFormWrapper>
                    <div>
                        <FormInput
                            name={nameof.full<AccountFormValues>(o => o.username)}
                            onChange={handleChange}
                            value={values.username}
                            validateStatus={errors.username ? 'error' : undefined}
                            label={text('Username')}
                            placeholder="..."
                            disabled={true}
                        />
                        <FormInput
                            name={nameof.full<AccountFormValues>(o => o.fullName)}
                            onChange={handleChange}
                            value={values.fullName}
                            validateStatus={errors.fullName ? 'error' : undefined}
                            label={text('Your full name')}
                            placeholder="..."
                            autoFocus={true}
                            required={true}
                        />
                        <FormInput
                            name={nameof.full<AccountFormValues>(o => o.email)}
                            onChange={handleChange}
                            value={values.email}
                            validateStatus={errors.email ? 'error' : undefined}
                            label={text('Email')}
                            placeholder="..."
                            autoFocus={true}
                            required={true}
                        />
                        <FormInput
                            name={nameof.full<AccountFormValues>(o => o.phone)}
                            onChange={handleChange}
                            value={values.phone}
                            validateStatus={errors.phone ? 'error' : undefined}
                            label={text('Phone')}
                            placeholder="..."
                            autoFocus={true}
                            required={true}
                        />
                    </div>
                    <div>

                    </div>
                </AccountFormWrapper>
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
