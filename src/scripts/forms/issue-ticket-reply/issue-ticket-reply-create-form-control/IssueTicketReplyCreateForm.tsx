import { Button } from 'antd';
import { FormikProps } from 'formik';
import * as React from 'react';

import { FormBody, FormTextArea } from '@/components';
import { text } from '@/i18n';
import { IssueTicketReply } from '@/restful';

export type IssueTicketReplyCreateFormValues = Partial<IssueTicketReply>;

export interface IssueTicketReplyCreateFormOwnProps extends FormikProps<IssueTicketReplyCreateFormValues> {

}

export class IssueTicketReplyCreateForm extends React.PureComponent<IssueTicketReplyCreateFormOwnProps> {
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
                <FormTextArea
                    name={nameof<IssueTicketReplyCreateFormValues>(o => o.content)}
                    onChange={handleChange}
                    value={values.content}
                    help={errors.content}
                    validateStatus={errors.content ? 'error' : undefined}
                    placeholder={text('comment')}
                    required={true}
                />
                <Button
                    type="primary"
                    onClick={() => handleSubmit()}
                    loading={isSubmitting}
                    disabled={!values.content}
                >
                    {text('Reply')}
                </Button>
            </FormBody>
        );
    }
}