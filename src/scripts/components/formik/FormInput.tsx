import { Form, Icon, Input } from 'antd';
import { FormItemProps } from 'antd/lib/form';
import { InputProps } from 'antd/lib/input';
import * as React from 'react';

interface FormFieldProps extends InputProps, FormItemProps {
    readonly useFieldWrapper?: boolean;
    readonly touched?: boolean;
}

function FormInputComponent(props: FormFieldProps) {
    const {
        useFieldWrapper,
        label,
        required,
        help,
        prefix,
        validateStatus,
        labelCol,
        wrapperCol,
        touched,
        ...rest
    } = props;

    const inputPrefix =
        (prefix && typeof prefix === 'string' && prefix.startsWith('adi')) ?
            <Icon type={prefix.replace('adi-', '')} /> :
            prefix;

    const input = <Input {...rest} prefix={inputPrefix} />;

    const isError = validateStatus === 'error';
    const helpMessage = (!isError && help) ? help : (isError && touched) && help;

    if (useFieldWrapper) {
        return (
            <Form.Item
                labelCol={labelCol}
                wrapperCol={wrapperCol}
                label={label}
                required={required}
                help={helpMessage}
                validateStatus={validateStatus}
                hasFeedback={true}
            >
                {input}
            </Form.Item>
        );
    }

    return input;
}

FormInputComponent.defaultProps = {
    useFieldWrapper: true
} as FormFieldProps;

export const FormInput = React.memo(FormInputComponent);