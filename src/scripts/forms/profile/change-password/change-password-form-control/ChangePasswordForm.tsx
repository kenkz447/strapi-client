import { Typography } from 'antd';
import { FormikProps } from 'formik';
import * as React from 'react';
import styled from 'styled-components';

import { FormBody, FormInput, FormSubmit } from '@/components';
import { text } from '@/i18n';
import { ChangePasswordRequestBody } from '@/restful';

export type ChangePasswordFormValues = ChangePasswordRequestBody;

export interface ChangePasswordFormOwnProps extends FormikProps<ChangePasswordFormValues> {

}

const FormArea = styled.div`
    width: 100%;
    max-width: 400px;
`;

export function ChangePassword(props: ChangePasswordFormOwnProps) {
    const {
        values,
        handleChange,
        handleBlur,
        isSubmitting,
        dirty
    } = props;

    return (
        <FormBody formProps={props}>
            <Typography.Title level={4}>
                {text('Change password')}
            </Typography.Title>
            <FormArea>
                <FormInput
                    name={nameof<ChangePasswordFormValues>(o => o.oldPassword)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.oldPassword}
                    prefix="adi-key"
                    label={text('Old password')}
                    placeholder={text('Old password')}
                    type="password"
                    required={true}
                />
                <FormInput
                    name={nameof<ChangePasswordFormValues>(o => o.newPassword)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.newPassword}
                    prefix="adi-key"
                    label={text('New password')}
                    placeholder={text('New password')}
                    type="password"
                    required={true}
                />
                <FormInput
                    name={nameof<ChangePasswordFormValues>(o => o.confirmNewPassword)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmNewPassword}
                    prefix="adi-key"
                    label={text('Password confirmation')}
                    placeholder={text('Password confirmation')}
                    type="password"
                    required={true}
                />
                <FormSubmit
                    formProps={props}
                    disabled={isSubmitting || !dirty}
                >
                    {text('Change password')}
                </FormSubmit>
            </FormArea>
        </FormBody>
    );
}