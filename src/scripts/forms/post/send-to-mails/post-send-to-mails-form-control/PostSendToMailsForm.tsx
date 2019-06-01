import { FormikProps } from 'formik';
import * as React from 'react';

import { FormBody, FormInput, FormTextArea } from '@/components';
import { text } from '@/i18n';
import { PostSendToMailsRequestBody } from '@/restful';

export type PostSendToMailsFormValues = PostSendToMailsRequestBody;

export interface PostSendToMailsFormProps extends FormikProps<PostSendToMailsFormValues> {
}

export class PostSendToMailsForm extends React.PureComponent<PostSendToMailsFormProps> {
    public render() {
        const {
            values,
            errors,
            handleChange } = this.props;

        return (
            <FormBody formProps={this.props}>
                <FormInput
                    name={nameof.full<PostSendToMailsFormValues>(o => o.subject)}
                    onChange={handleChange}
                    value={values.subject}
                    validateStatus={errors.subject ? 'error' : undefined}
                    label={text('Subject')}
                    placeholder={text('Input subject')}
                    required={true}
                />
                <FormInput
                    name={nameof.full<PostSendToMailsFormValues>(o => o.preHeader)}
                    onChange={handleChange}
                    value={values.preHeader}
                    validateStatus={errors.preHeader ? 'error' : undefined}
                    label={text('Preheader')}
                    placeholder={text('Input preheader')}
                    required={true}
                />
                <FormInput
                    name={nameof.full<PostSendToMailsFormValues>(o => o.imgSrc)}
                    onChange={handleChange}
                    value={values.imgSrc}
                    validateStatus={errors.imgSrc ? 'error' : undefined}
                    label={text('Image url')}
                    placeholder={text('Input image url')}
                    required={true}
                />
                <FormInput
                    name={nameof.full<PostSendToMailsFormValues>(o => o.title)}
                    onChange={handleChange}
                    value={values.title}
                    validateStatus={errors.title ? 'error' : undefined}
                    label={text('Post title')}
                    placeholder={text('input post title')}
                    required={true}
                />
                <FormTextArea
                    name={nameof.full<PostSendToMailsFormValues>(o => o.content)}
                    onChange={handleChange}
                    value={values.content}
                    validateStatus={errors.content ? 'error' : undefined}
                    help={errors.content}
                    label={text('Content')}
                    placeholder="..."
                    required={true}
                />
                <FormInput
                    name={nameof.full<PostSendToMailsFormValues>(o => o.postUrl)}
                    onChange={handleChange}
                    value={values.postUrl}
                    validateStatus={errors.postUrl ? 'error' : undefined}
                    label={text('Post url')}
                    placeholder={text('input post url')}
                    required={true}
                />
            </FormBody>
        );
    }
}
