import { FormikProps } from 'formik';
import * as React from 'react';

import { FormBody, FormInput, FormTextArea } from '@/components';
import { text } from '@/i18n';
import { IssueTicket } from '@/restful';

export type IssueTicketCreateFormValues = Partial<IssueTicket>;

export interface IssueTicketCreateFormOwnProps extends FormikProps<IssueTicketCreateFormValues> {

}

export class IssueTicketCreateForm extends React.PureComponent<IssueTicketCreateFormOwnProps> {
    public render() {
        const {
            values,
            errors,
            handleChange
        } = this.props;

        return (
            <FormBody formProps={this.props}>
                {
                    !values.order && (
                        <FormInput
                            name={nameof<IssueTicketCreateFormValues>(o => o.title)}
                            onChange={handleChange}
                            value={values.title}
                            help={errors.title}
                            validateStatus={errors.title ? 'error' : undefined}
                            label={text('Title')}
                            placeholder={text('Input title')}
                            required={true}
                            autoFocus={true}
                        />
                    )
                }
                {
                    !values.order && (
                        <FormInput
                            name={nameof<IssueTicketCreateFormValues>(o => o.orderCode)}
                            onChange={handleChange}
                            value={values.orderCode}
                            help={errors.orderCode}
                            validateStatus={errors.orderCode ? 'error' : undefined}
                            label={text('Order code')}
                            placeholder={text('Input title')}
                            required={true}
                            disabled={!!values.order}
                        />
                    )
                }
                <FormTextArea
                    name={nameof<IssueTicketCreateFormValues>(o => o.description)}
                    onChange={handleChange}
                    value={values.description}
                    help={errors.description}
                    validateStatus={errors.description ? 'error' : undefined}
                    label={text('Content')}
                    placeholder={text('exactly what happened?')}
                    required={true}
                    autoFocus={true}
                />
            </FormBody>
        );
    }
}