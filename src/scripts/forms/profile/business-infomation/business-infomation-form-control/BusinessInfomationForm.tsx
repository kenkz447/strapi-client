import { Typography } from 'antd';
import { FormikProps } from 'formik';
import * as React from 'react';
import styled from 'styled-components';

import { FormBody, FormInput, FormSubmit } from '@/components';
import { text } from '@/i18n';
import { User } from '@/restful';

const BusinessInfomationFormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: justify;
    > div {
        flex-grow: 1;
        max-width: 400px;
    }
`;

export type BusinessInfomationFormValues = Partial<User>;

export interface BusinessInfomationFormProps extends FormikProps<BusinessInfomationFormValues> {
    readonly readOnly?: boolean;
    readonly hideSubmitBtn?: boolean;
}

export class BusinessInfomationForm extends React.PureComponent<BusinessInfomationFormProps> {
    public render() {
        const {
            values,
            errors,
            handleChange,
            isSubmitting,
            dirty,
            readOnly,
            hideSubmitBtn
        } = this.props;

        return (
            <FormBody formProps={this.props}>
                <BusinessInfomationFormWrapper>
                    <Typography.Paragraph>
                        {/* tslint:disable-next-line:max-line-length */}
                        Sử dụng dịch vụ thiết kế tùy biến sản phẩm furniture chỉ dành riêng cho đối tác thương mại của Mfunirure.vn. Vui lòng nhập thông tin bên dưới:
                    </Typography.Paragraph>
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
                {
                    !hideSubmitBtn && (
                        <FormSubmit
                            formProps={this.props}
                            disabled={isSubmitting || !dirty}
                        >
                            {text('Update')}
                        </FormSubmit>
                    )
                }
            </FormBody>
        );
    }
}
