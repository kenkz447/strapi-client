import { Button } from 'antd';
import { FormikProps } from 'formik';
import * as React from 'react';

import { FormBody, FormInput } from '@/components';
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
            handleSubmit,
            isSubmitting
        } = this.props;

        return (
            <FormBody formProps={this.props}>
                <FormInput
                    name={nameof<InvitationCreateFormValues>(o => o.receiverFullName)}
                    onChange={handleChange}
                    value={values.receiverFullName}
                    help={errors.receiverFullName}
                    validateStatus={errors.receiverFullName ? 'error' : undefined}
                    label={text('Receiver fullname')}
                    placeholder={text('input receiver fullname')}
                    required={true}
                    autoFocus={true}
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
                    autoFocus={true}
                />
            </FormBody>
        );
    }
}