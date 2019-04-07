import { Icon } from 'antd';
import { FormikProps } from 'formik';
import * as React from 'react';

import { FormBody, FormInput, FormSubmit } from '@/components';
import { text } from '@/i18n';
import { InvitationJoinRequestBody } from '@/restful';

export type AuthInvitaionFormValues = Partial<InvitationJoinRequestBody>;
export interface AuthInvitaionFormOwnProps extends FormikProps<AuthInvitaionFormValues> {

}

export function AuthInvitaionForm(props: AuthInvitaionFormOwnProps) {
    const {
        values,
        errors,
        handleChange,
        isSubmitting
    } = props;

    return (
        <FormBody
            formProps={props}
            autoComplete="disabled"
        >
            <FormInput
                name={nameof.full<AuthInvitaionFormValues>(o => o.email)}
                onChange={handleChange}
                value={values.email}
                help={errors.email}
                validateStatus={errors.email ? 'error' : undefined}
                placeholder={text('Your email')}
                autoFocus={true}
                required={true}
                size="large"
                prefix={<Icon type="mail" />}
                autoComplete="off"
            />
            <FormInput
                type="password"
                name={nameof<AuthInvitaionFormValues>(o => o.password)}
                onChange={handleChange}
                value={values.password}
                prefix="adi-lock"
                size="large"
                placeholder={text('Password')}
                help={errors.password}
                validateStatus={errors.rePassword && 'error'}
            />

            <FormInput
                type="password"
                name={nameof<AuthInvitaionFormValues>(o => o.rePassword)}
                onChange={handleChange}
                value={values.rePassword}
                prefix="adi-lock"
                size="large"
                placeholder={text('Re-enter the password')}
                help={errors.rePassword}
                validateStatus={errors.rePassword && 'error'}
            />
            <FormSubmit
                size="large"
                formProps={props}
                disabled={isSubmitting}
            >
                {text('Register')}
            </FormSubmit>
        </FormBody>
    );
}