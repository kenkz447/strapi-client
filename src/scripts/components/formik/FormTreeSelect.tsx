import { Form } from 'antd';
import { FormItemProps } from 'antd/lib/form';
import { SelectValue } from 'antd/lib/select';
import TreeSelect, { TreeSelectProps } from 'antd/lib/tree-select';
import { TreeNodeSimpleMode } from 'antd/lib/tree-select/interface';
import * as React from 'react';

export type FormTreeSelectOption = TreeNodeSimpleMode;

interface FormFieldProps extends TreeSelectProps, FormItemProps {
    readonly name: string;
    readonly setFieldValue: (fieldName: string, value: SelectValue, shouldValidate: boolean) => void;
    readonly options: FormTreeSelectOption[];
    readonly useFieldWrapper?: boolean;
}

export class FormTreeSelect extends React.PureComponent<FormFieldProps> {
    static readonly defaultProps = {
        useFieldWrapper: true,
        treeDataSimpleMode: true,
        treeCheckable: true
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
            <TreeSelect
                {...rest}
                treeData={options}
                treeDataSimpleMode={true}
                onChange={(value) => {
                    setFieldValue(name, value, true);
                }}
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
                    {select}
                </Form.Item>
            );
        }

        return select;
    }
}