import { Col, Icon, Row } from 'antd';
import { FormikProps } from 'formik';
import * as React from 'react';

import { FormBody, FormInput, FormSubmit } from '@/components';
import { text } from '@/i18n';
import { User } from '@/restful';

export type RegisterFormValues = Partial<User>;

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
        <FormBody
            formProps={props}
            autoComplete="off"
        >
            <FormInput
                name={nameof.full<RegisterFormValues>(o => o.fullName)}
                onChange={handleChange}
                value={values.fullName}
                validateStatus={errors.fullName ? 'error' : undefined}
                help={errors.fullName}
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
                help={errors.phone}
                placeholder={text('Your phone number')}
                required={true}
                size="large"
                prefix={<Icon type="phone" />}
            />
            <FormInput
                name={nameof.full<RegisterFormValues>(o => o.email)}
                onChange={handleChange}
                value={values.email}
                validateStatus={errors.email ? 'error' : undefined}
                help={errors.email}
                placeholder={text('Your email')}
                required={true}
                size="large"
                prefix={<Icon type="mail" />}
            />
            <Row gutter={12}>
                <Col span={12}>
                    <FormInput
                        type="password"
                        name={nameof<RegisterFormValues>(o => o.password)}
                        validateStatus={errors.password ? 'error' : undefined}
                        help={errors.password}
                        onChange={handleChange}
                        value={values.password}
                        prefix="adi-lock"
                        size="large"
                        placeholder="Mật khẩu"
                    />
                </Col>
                <Col span={12}>
                    <FormInput
                        type="password"
                        name={nameof<RegisterFormValues>(o => o.rePassword)}
                        validateStatus={errors.rePassword ? 'error' : undefined}
                        help={errors.rePassword}
                        onChange={handleChange}
                        value={values.rePassword}
                        prefix="adi-lock"
                        size="large"
                        placeholder="Nhập lại mật khẩu"
                    />
                </Col>
            </Row>

            <h4>Thông tin kinh doanh</h4>
            <FormInput
                name={nameof<RegisterFormValues>(o => o.registration_businessAreas)}
                onChange={handleChange}
                value={values.registration_businessAreas}
                validateStatus={errors.registration_businessAreas ? 'error' : undefined}
                help={errors.registration_businessAreas}
                size="large"
                placeholder="Lĩnh vực kinh doanh"
                required={true}
            />
            <FormInput
                name={nameof<RegisterFormValues>(o => o.registration_companyName)}
                onChange={handleChange}
                value={values.registration_companyName}
                validateStatus={errors.registration_companyName ? 'error' : undefined}
                help={errors.registration_companyName}
                size="large"
                placeholder="Tên công ty"
                required={true}
            />
            <FormInput
                name={nameof<RegisterFormValues>(o => o.registration_companyAddress)}
                onChange={handleChange}
                value={values.registration_companyAddress}
                validateStatus={errors.registration_companyAddress ? 'error' : undefined}
                help={errors.registration_companyAddress}
                size="large"
                placeholder="Địa chỉ công ty"
                required={true}
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