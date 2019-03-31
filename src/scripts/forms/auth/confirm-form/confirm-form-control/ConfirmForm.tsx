import { Divider, Icon, Typography } from 'antd';
import { FormikProps } from 'formik';
import * as React from 'react';

import { FormBody, FormCheckbox, FormInput, FormSubmit } from '@/components';
import { FormUpload } from '@/components/formik/FormUpload';
import { text } from '@/i18n';
import { BusinessLicense } from '@/restful';

export type ConfirmFormValues = Partial<BusinessLicense>;

export interface ConfirmFormOwnProps extends FormikProps<ConfirmFormValues> {

}

export function ConfirmForm(props: ConfirmFormOwnProps) {
    const {
        values,
        errors,
        handleChange,
        isSubmitting,
        setFieldValue
    } = props;

    const isValid = !values.isBusiness ||
        !!(values.businessAreas
            && values.businessLicense
            && values.companyName
        );

    const checkboxHelp = 'Nếu bạn không có giấy phép kinh doanh, vui lòng bỏ chọn ô này!';
    return (
        <FormBody formProps={props}>
            <div >
                <FormCheckbox
                    name={nameof.full<ConfirmFormValues>(o => o.isBusiness)}
                    value={values.isBusiness}
                    onChange={handleChange}
                    help={values.isBusiness && checkboxHelp}
                >
                    Doanh nhiệp
                </FormCheckbox>
            </div>
            {
                values.isBusiness
                    ? (
                        <React.Fragment>
                            <div className="white-space-2" />
                            <div>
                                <FormInput
                                    name={nameof.full<ConfirmFormValues>(o => o.businessAreas)}
                                    onChange={handleChange}
                                    value={values.businessAreas}
                                    validateStatus={errors.businessAreas ? 'error' : undefined}
                                    placeholder={text('Business areas')}
                                    autoFocus={true}
                                    size="large"
                                    useFieldWrapper={false}
                                />
                            </div>
                            <br />
                            <div>
                                <FormInput
                                    name={nameof.full<ConfirmFormValues>(o => o.companyName)}
                                    onChange={handleChange}
                                    value={values.companyName}
                                    validateStatus={errors.companyName ? 'error' : undefined}
                                    placeholder={text('Company name')}
                                    size="large"
                                    useFieldWrapper={false}
                                />
                            </div>
                            <br />
                            <div>
                                <FormInput
                                    name={nameof.full<ConfirmFormValues>(o => o.companyAddress)}
                                    onChange={handleChange}
                                    value={values.companyAddress}
                                    validateStatus={errors.companyAddress ? 'error' : undefined}
                                    placeholder={text('Company address')}
                                    size="large"
                                    useFieldWrapper={false}
                                />
                            </div>
                            <br />
                            <FormUpload
                                name={nameof.full<ConfirmFormValues>(o => o.businessLicense)}
                                setFieldValue={setFieldValue}
                                value={values.businessLicense}
                                validateStatus={errors.businessLicense ? 'error' : undefined}
                                label={text('Business license')}
                                buttonType="default"
                            />
                        </React.Fragment>
                    )
                    : (
                        null
                    )
            }
            <FormSubmit
                size="large"
                formProps={props}
                disabled={!isValid}
                loading={isSubmitting}
            >
                {text('Send')}
            </FormSubmit>
        </FormBody>
    );
}