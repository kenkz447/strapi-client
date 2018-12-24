import { Form, Input } from 'antd';
import { FormItemProps } from 'antd/lib/form';
import { TextAreaProps } from 'antd/lib/input';
import * as React from 'react';

interface FormFieldProps extends TextAreaProps, FormItemProps {
    readonly useFieldWrapper?: boolean;
}

function FormTextAreaComponent(props: FormFieldProps) {
    const {
        useFieldWrapper,
        label,
        required,
        help,
        prefix,
        validateStatus,
        labelCol,
        wrapperCol,
        ...rest
    } = props;

    const input = <Input.TextArea {...rest}/>;

    if (useFieldWrapper) {
        return (
            <Form.Item
                labelCol={labelCol}
                wrapperCol={wrapperCol}
                label={label}
                required={required}
                help={help}
                validateStatus={validateStatus}
            >
                {input}
            </Form.Item>
        );
    }

    return input;
}

FormTextAreaComponent.defaultProps = {
    useFieldWrapper: true,
    rows: 3
} as FormFieldProps;

export const FormTextArea = React.memo(FormTextAreaComponent);