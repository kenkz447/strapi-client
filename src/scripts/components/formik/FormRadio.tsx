import { Form, Radio } from 'antd';
import { FormItemProps } from 'antd/lib/form';
import { RadioGroupProps } from 'antd/lib/radio';
import * as React from 'react';

import { Omit } from '@/app';

interface FormFieldProps extends Omit<RadioGroupProps, 'value'>, FormItemProps {
    readonly id?: string;
    readonly value?: string;
    readonly name: string;
    readonly useFieldWrapper?: boolean;
}

function FormRadioGroupComponent(props: FormFieldProps) {
    const {
        useFieldWrapper,
        label,
        required,
        help,
        validateStatus,
        labelCol,
        wrapperCol,
        ...rest
    } = props;

    const input = (
        <Radio.Group {...rest}/>
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
            >
                {input}
            </Form.Item>
        );
    }

    return input;
}

FormRadioGroupComponent.defaultProps = {
    useFieldWrapper: true
} as FormFieldProps;

export const FormRadioGroup = React.memo(FormRadioGroupComponent);