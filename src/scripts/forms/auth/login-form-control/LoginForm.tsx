import { FormikProps } from 'formik';
import * as React from 'react';
import styled from 'styled-components';

import { FormBody, FormInput, FormSubmit } from '@/components';
import { text } from '@/i18n';
import { AuthLoginRequestBody } from '@/restful';

export type LoginFormValues = Partial<AuthLoginRequestBody>;

export interface LoginFormOwnProps extends FormikProps<LoginFormValues> {

}

const FormArea = styled.div`
    width: 100%;
`;

export function LoginForm(props: LoginFormOwnProps) {
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
                    name={nameof<LoginFormValues>(o => o.identifier)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.identifier}
                    prefix="adi-user"
                    size="large"
                    placeholder="Tên đăng nhập hoặc email"
                />
                <FormInput
                    type="password"
                    name={nameof<LoginFormValues>(o => o.password)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    prefix="adi-lock"
                    size="large"
                    placeholder="Mật khẩu"
                />
                <FormSubmit
                    size="large"
                    formProps={props}
                    disabled={isSubmitting}
                >
                    {text('Login')}
                </FormSubmit>
            </FormArea>
        </FormBody>
    );
}