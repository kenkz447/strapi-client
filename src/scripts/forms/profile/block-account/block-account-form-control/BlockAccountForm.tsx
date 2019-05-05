import { FormikProps } from 'formik';
import * as React from 'react';

import { FormBody, FormTextArea } from '@/components';
import { text } from '@/i18n';
import { User } from '@/restful';

export type BlockAccountFormValues = User;

export interface BlockAccountFormProps extends FormikProps<BlockAccountFormValues> {
}

export class BlockAccountForm extends React.PureComponent<BlockAccountFormProps> {
    public render() {
        const {
            values,
            errors,
            handleChange } = this.props;

        return (
            <FormBody formProps={this.props}>
                <FormTextArea
                    name={nameof.full<BlockAccountFormValues>(o => o.blockedReason)}
                    onChange={handleChange}
                    value={values.blockedReason}
                    validateStatus={errors.blockedReason ? 'error' : undefined}
                    help={errors.blockedReason}
                    label={text('Reason')}
                    placeholder="..."
                    autoFocus={true}
                    required={true}
                />
            </FormBody>
        );
    }
}
