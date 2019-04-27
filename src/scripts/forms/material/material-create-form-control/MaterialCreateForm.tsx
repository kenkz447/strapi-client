import { OptionProps } from 'antd/lib/select';
import { FormikProps } from 'formik';
import * as React from 'react';

import {
    FormBody,
    FormInput,
    FormSelect,
    FormUpload,
    verticalLayout
} from '@/components';
import { text } from '@/i18n';
import { FurnitureMaterial } from '@/restful';

export type MaterialCreateFormValues = Partial<FurnitureMaterial>;

export interface MaterialCreateFormOwnProps extends FormikProps<MaterialCreateFormValues> {
    readonly materialOptions: OptionProps[];
}

export class MaterialCreateForm extends React.PureComponent<MaterialCreateFormOwnProps> {
    public render() {
        const {
            values,
            errors,
            handleChange,
            setFieldValue,
            materialOptions
        } = this.props;

        return (
            <FormBody formProps={this.props}>
                {
                    materialOptions.length
                        ? (
                            <FormSelect
                                name={nameof.full<MaterialCreateFormValues>(o => o.materialType!.id)}
                                options={materialOptions}
                                value={values.materialType ? values.materialType.id : undefined}
                                setFieldValue={setFieldValue}
                                validateStatus={errors.materialType ? 'error' : undefined}
                                help={errors.materialType && errors.materialType['id']}
                                label={text('Material type')}
                                placeholder={text('select material type')}
                                wrapperCol={verticalLayout.wrapperCol}
                                labelCol={verticalLayout.labelCol}
                                required={true}
                            />
                        )
                        : null
                }
                <FormInput
                    name={nameof<MaterialCreateFormValues>(o => o.displayName)}
                    onChange={handleChange}
                    value={values.displayName}
                    help={errors.displayName}
                    validateStatus={errors.displayName ? 'error' : undefined}
                    label={text('Material name')}
                    placeholder={text('Input material name')}
                    required={true}
                    autoFocus={true}
                    labelCol={verticalLayout.labelCol}
                    wrapperCol={verticalLayout.wrapperCol}
                />
                <FormUpload
                    name={nameof.full<MaterialCreateFormValues>(o => o.texture)}
                    setFieldValue={setFieldValue}
                    value={values.texture}
                    help={errors.texture && errors.texture['id']}
                    validateStatus={errors.texture ? 'error' : undefined}
                    label={text('Texture file')}
                    buttonType="default"
                    wrapperCol={verticalLayout.wrapperCol}
                    labelCol={verticalLayout.labelCol}
                    required={true}
                />
            </FormBody>
        );
    }
}