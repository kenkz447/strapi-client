import { Form, Icon, Input } from 'antd';
import { FormItemProps } from 'antd/lib/form';
import InputNumber, { InputNumberProps } from 'antd/lib/input-number';
import * as React from 'react';

interface FormFieldProps extends InputNumberProps, FormItemProps {
    readonly name: string;
    readonly useFieldWrapper?: boolean;
    readonly setFieldValue: (fieldName: string, value: string | number | undefined, shouldValidate: boolean) => void;
}

function FormInputMoneyComponent(props: FormFieldProps) {
    const {
        useFieldWrapper,
        label,
        required,
        help,
        prefix,
        validateStatus,
        labelCol,
        wrapperCol,
        setFieldValue,
        name,
        ...rest
    } = props;

    const inputPrefix =
        (prefix && typeof prefix === 'string' && prefix.startsWith('adi')) ?
            <Icon type={prefix.replace('adi-', '')} /> :
            prefix;

    const input = (
        <InputNumber
            {...rest}
            prefix={inputPrefix as string}
            onChange={(value) => setFieldValue(name, value, true)}
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

FormInputMoneyComponent.defaultProps = {
    useFieldWrapper: true,
    min: 0,
    formatter: (value: string) => {
        const re = new RegExp('\\B(?=(\\d{3})+(?!\\d))', 'g');
        return `${value}`.replace(re, ',');
    },
    parser: (value) => {
        if (!value) {
            return 0;
        }
        const num = value.replace(/[^0-9-]/g, '');
        return +num.replace(/,/g, '');
    },
} as FormFieldProps;

export const FormInputMoney = React.memo(FormInputMoneyComponent);