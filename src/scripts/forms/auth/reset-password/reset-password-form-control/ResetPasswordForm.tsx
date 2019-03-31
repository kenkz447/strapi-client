import { FormikProps } from 'formik';
import * as React from 'react';
import styled from 'styled-components';

import { FormBody, FormInput, FormSubmit } from '@/components';
import { text } from '@/i18n';
import { AuthResetPasswordRequestBody } from '@/restful';

export type ResetPasswordFormValues = Partial<AuthResetPasswordRequestBody>;

export interface ResetPasswordFormOwnProps extends FormikProps<ResetPasswordFormValues> {

}

const FormArea = styled.div`
    width: 100%;
    .register-link {
        line-height: 20px;
    }
`;

export function ResetPassword(props: ResetPasswordFormOwnProps) {
    const {
        values,
        handleChange,
        handleBlur,
        isSubmitting
    } = props;

    return (
        <FormBody formProps={props}>
            <FormArea>
                <FormInput
                    name={nameof<ResetPasswordFormValues>(o => o.password)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    prefix="adi-key"
                    size="large"
                    placeholder={text('New password')}
                    type="password"
                />
                <FormInput
                    name={nameof<ResetPasswordFormValues>(o => o.passwordConfirmation)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.passwordConfirmation}
                    prefix="adi-key"
                    size="large"
                    placeholder={text('Password confirmation')}
                    type="password"
                />
                <FormSubmit
                    size="large"
                    formProps={props}
                    disabled={isSubmitting}
                >
                    {text('Send')}
                </FormSubmit>
            </FormArea>
        </FormBody>
    );
}