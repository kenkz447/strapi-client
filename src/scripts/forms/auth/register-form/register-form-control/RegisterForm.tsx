import { Icon } from 'antd';
import { FormikProps } from 'formik';
import * as React from 'react';

import { FormBody, FormInput, FormSubmit } from '@/components';
import { text } from '@/i18n';
import { User } from '@/restful';

export type RegisterFormValues = Partial<User> & {
    readonly password: string;
};

export interface RegisterFormOwnProps extends FormikProps<RegisterFormValues> {

}

export function RegisterForm(props: RegisterFormOwnProps) {
    const {
        values,
        errors,
        handleChange,
        isSubmitting
    } = props;

    return (
        <FormBody formProps={props}>
            <FormInput
                name={nameof.full<RegisterFormValues>(o => o.fullName)}
                onChange={handleChange}
                value={values.fullName}
                validateStatus={errors.fullName ? 'error' : undefined}
                placeholder={text('Your full name')}
                autoFocus={true}
                required={true}
                size="large"
                prefix={<Icon type="font-colors" />}
            />
            <FormInput
                name={nameof.full<RegisterFormValues>(o => o.phone)}
                onChange={handleChange}
                value={values.phone}
                validateStatus={errors.phone ? 'error' : undefined}
                placeholder={text('Your phone number')}
                autoFocus={true}
                required={true}
                size="large"
                prefix={<Icon type="phone" />}
            />
            <FormInput
                name={nameof.full<RegisterFormValues>(o => o.username)}
                onChange={handleChange}
                value={values.username}
                validateStatus={errors.username ? 'error' : undefined}
                placeholder={text('Username')}
                autoFocus={true}
                required={true}
                size="large"
                prefix={<Icon type="user" />}
            />
            <FormInput
                name={nameof.full<RegisterFormValues>(o => o.email)}
                onChange={handleChange}
                value={values.email}
                validateStatus={errors.email ? 'error' : undefined}
                placeholder={text('Your email')}
                autoFocus={true}
                required={true}
                size="large"
                prefix={<Icon type="mail" />}
            />
            <FormInput
                type="password"
                name={nameof<RegisterFormValues>(o => o.password)}
                onChange={handleChange}
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
                {text('Register')}
            </FormSubmit>
        </FormBody>
    );
}