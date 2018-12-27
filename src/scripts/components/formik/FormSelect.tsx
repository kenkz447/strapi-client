import { Form, Select } from 'antd';
import { FormItemProps } from 'antd/lib/form';
import { OptionProps, SelectProps, SelectValue } from 'antd/lib/select';
import * as React from 'react';

interface FormFieldProps extends SelectProps, FormItemProps {
    readonly name?: string;
    readonly setFieldValue?: (fieldName: string, value: SelectValue, shouldValidate: boolean) => void;
    readonly options: OptionProps[];
    readonly useFieldWrapper?: boolean;
}

export class FormSelect extends React.PureComponent<FormFieldProps> {
    static readonly defaultProps = {
        useFieldWrapper: true
    };

    render() {
        const {
            useFieldWrapper,
            label,
            required,
            help,
            validateStatus,
            labelCol,
            wrapperCol,
            options,
            setFieldValue,
            name,
            ...rest
        } = this.props;

        const select = (
            <Select
                {...rest}
                onSelect={(value) => {
                    if (!setFieldValue || !name) {
                        return;
                    }

                    setFieldValue(name, value, true);
                }}
            >
                {options.map(o => <Select.Option key={String(o.value)} value={o.value}>{o.title}</Select.Option>)}
            </Select>
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
                    {select}
                </Form.Item>
            );
        }

        return select;
    }
}