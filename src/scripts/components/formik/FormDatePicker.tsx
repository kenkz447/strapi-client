import { DatePicker, Form } from 'antd';
import { DatePickerProps } from 'antd/lib/date-picker/interface';
import { FormItemProps } from 'antd/lib/form';
import { Moment } from 'moment';
import * as moment from 'moment';
import { Omit } from 'qoobee';
import * as React from 'react';

import { DATE_FORMAT } from '@/configs';

interface FormFieldProps extends Omit<DatePickerProps, 'value'>, FormItemProps {
    readonly id?: string;
    readonly value?: string | Moment;
    readonly name: string;
    readonly useFieldWrapper?: boolean;
    readonly setFieldValue: (fieldName: string, value: string | Moment, shouldValidate: boolean) => void;
}

function FormDatePickerComponent(props: FormFieldProps) {
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
        <DatePicker
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

FormDatePickerComponent.defaultProps = {
    useFieldWrapper: true,
    format: DATE_FORMAT
} as FormFieldProps;

export const FormDatePicker = React.memo(FormDatePickerComponent);