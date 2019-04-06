import { FormikProps } from 'formik';
import * as React from 'react';

import {
    FormBody,
    FormInput,
    FormTextArea,
    verticalLayout
} from '@/components';
import {
    AgencyCityAndCounty
} from '@/forms/agency/agency-create/agency-form-control/agency-form';
import { text } from '@/i18n';
import { Invitation } from '@/restful';

export type InvitationCreateFormValues = Partial<Invitation>;

export interface InvitationCreateFormOwnProps extends FormikProps<InvitationCreateFormValues> {

}

export class InvitationCreateForm extends React.PureComponent<InvitationCreateFormOwnProps> {
    public render() {
        const {
            values,
            errors,
            handleChange,
            setFieldValue
        } = this.props;

        return (
            <FormBody formProps={this.props}>
                <FormInput
                    name={nameof<InvitationCreateFormValues>(o => o.receiverFullName)}
                    onChange={handleChange}
                    value={values.receiverFullName}
                    help={errors.receiverFullName}
                    validateStatus={errors.receiverFullName ? 'error' : undefined}
                    label={text('Receiver')}
                    placeholder={text('input receiver fullname')}
                    required={true}
                    autoFocus={true}
                    labelCol={verticalLayout.labelCol}
                    wrapperCol={verticalLayout.wrapperCol}
                />
                <FormInput
                    name={nameof<InvitationCreateFormValues>(o => o.receiverAgencyName)}
                    onChange={handleChange}
                    value={values.receiverAgencyName}
                    help={errors.receiverAgencyName}
                    validateStatus={errors.receiverAgencyName ? 'error' : undefined}
                    label={text('Agency name')}
                    placeholder={text('input agency name')}
                    required={true}
                    labelCol={verticalLayout.labelCol}
                    wrapperCol={verticalLayout.wrapperCol}
                />
                <FormInput
                    name={nameof<InvitationCreateFormValues>(o => o.receiverPhone)}
                    onChange={handleChange}
                    value={values.receiverPhone}
                    help={errors.receiverPhone}
                    validateStatus={errors.receiverPhone ? 'error' : undefined}
                    label={text('Phone')}
                    placeholder={text('input phone number')}
                    required={true}
                    labelCol={verticalLayout.labelCol}
                    wrapperCol={verticalLayout.wrapperCol}
                />
                <AgencyCityAndCounty<InvitationCreateFormValues>
                    cityFieldName={nameof.full<InvitationCreateFormValues>(o => o.receiverCity!.id)}
                    cityError={errors.receiverCity}
                    countyError={errors.receiverCounty}
                    countryFieldName={nameof.full<InvitationCreateFormValues>(o => o.receiverCounty!.id)}
                    city={values.receiverCity}
                    county={values.receiverCounty}
                    setFieldValue={setFieldValue}
                />
                <FormInput
                    name={nameof<InvitationCreateFormValues>(o => o.receiverAddress)}
                    onChange={handleChange}
                    value={values.receiverAddress}
                    help={errors.receiverAddress}
                    validateStatus={errors.receiverAddress ? 'error' : undefined}
                    label={text('Address')}
                    placeholder={text('input address')}
                    required={true}
                    labelCol={verticalLayout.labelCol}
                    wrapperCol={verticalLayout.wrapperCol}
                />
                <FormTextArea
                    name={nameof<InvitationCreateFormValues>(o => o.note)}
                    onChange={handleChange}
                    value={values.note}
                    help={errors.note}
                    validateStatus={errors.note ? 'error' : undefined}
                    label={text('Note')}
                    placeholder={text('ghi gì cũng được!')}
                    labelCol={verticalLayout.labelCol}
                    wrapperCol={verticalLayout.wrapperCol}
                />
            </FormBody>
        );
    }
}