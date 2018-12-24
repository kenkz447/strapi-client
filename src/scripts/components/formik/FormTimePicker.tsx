import { Form, TimePicker } from 'antd';
import { FormItemProps } from 'antd/lib/form';
import { TimePickerProps } from 'antd/lib/time-picker';
import { Moment } from 'moment';
import * as moment from 'moment';
import * as React from 'react';

import { Omit } from '@/app';

interface FormFieldProps extends Omit<TimePickerProps, 'value'>, FormItemProps {
    readonly id?: string;
    readonly value?: string | Moment;
    readonly name: string;
    readonly useFieldWrapper?: boolean;
    readonly setFieldValue: (fieldName: string, value: string | Moment, shouldValidate: boolean) => void;
}

function FormTimePickerComponent(props: FormFieldProps) {
    const {
        useFieldWrapper,
        label,
        required,
        help,
        validateStatus,
        labelCol,
        wrapperCol,
        setFieldValue,
        name,
        value,
        ...rest
    } = props;

    const parseValue = typeof value === 'string' ? moment(value) : value;

    const input = (
        <TimePicker
            {...rest}
            value={parseValue}
            onChange={(newValue) => setFieldValue(name, newValue, true)}
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
            >
                {input}
            </Form.Item>
        );
    }

    return input;
}

FormTimePickerComponent.defaultProps = {
    useFieldWrapper: true,
    format: 'HH:mm'
} as FormFieldProps;

export const FormTimePicker = React.memo(FormTimePickerComponent);