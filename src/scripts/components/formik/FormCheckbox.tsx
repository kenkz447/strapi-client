import { Checkbox, Form } from 'antd';
import { CheckboxProps } from 'antd/lib/checkbox';
import { FormItemProps } from 'antd/lib/form';
import * as React from 'react';

interface FormFieldProps extends CheckboxProps, FormItemProps {
    readonly name: string;
    readonly useFieldWrapper?: boolean;
}

function FormCheckboxComponent(props: FormFieldProps) {
    const {
        useFieldWrapper,
        label,
        required,
        help,
        validateStatus,
        labelCol,
        wrapperCol,
        className,
        onChange,
        value,
        ...rest
    } = props;

    const input = (
        <Checkbox
            {...rest}
            checked={value}
            onChange={onChange}
        />
    );

    if (useFieldWrapper) {
        return (
            <Form.Item
                labelCol={labelCol}
                wrapperCol={wrapperCol}
                label={label}
                required={required}
                help={help}
                validateStatus={validateStatus}
                className={className}
            >
                {input}
            </Form.Item>
        );
    }

    return input;
}

FormCheckboxComponent.defaultProps = {
    useFieldWrapper: true
} as FormFieldProps;

export const FormCheckbox = React.memo(FormCheckboxComponent);