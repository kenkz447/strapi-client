import { Icon } from 'antd';
import { FormikProps } from 'formik';
import * as React from 'react';

import { getAllOrderStatus } from '@/business/order';
import {
    FormBody,
    FormDatePicker,
    FormInput,
    FormSelect,
    FormSubmit,
    verticalLayout
} from '@/components';
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
        setFieldValue,
        handleChange,
        isSubmitting
    } = props;

    return (
        <FormBody formProps={props}>
            <FormInput
                name={nameof.full<RegisterFormValues>(o => o.name)}
                onChange={handleChange}
                value={values.name}
                validateStatus={errors.name ? 'error' : undefined}
                placeholder={text('Your full name')}
                autoFocus={true}
                required={true}
                size="large"
                prefix={<Icon type="user" />}
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