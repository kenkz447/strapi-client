import { FormikProps } from 'formik';
import * as React from 'react';
import styled from 'styled-components';

import { FormBody, FormInput, FormSubmit } from '@/components';
import { text } from '@/i18n';
import { AuthForgottenPasswordRequestBody } from '@/restful';

export type ForgottenPasswordFormValues = Partial<AuthForgottenPasswordRequestBody>;

export interface ForgottenPasswordFormOwnProps extends FormikProps<ForgottenPasswordFormValues> {

}

const FormArea = styled.div`
    width: 100%;
    .register-link {
        line-height: 20px;
    }
`;

export function ForgottenPassword(props: ForgottenPasswordFormOwnProps) {
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
                    name={nameof<ForgottenPasswordFormValues>(o => o.email)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    prefix="adi-user"
                    size="large"
                    placeholder={text('Your email')}
                    type="email"
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