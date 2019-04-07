import { OptionProps } from 'antd/lib/select';
import { Formik } from 'formik';
import * as React from 'react';

import {
    getAllExternalFurnitureMaterialType
} from '@/business/furniture-material-type';
import { FormikControlBase, FormikControlBaseProps } from '@/components';

import {
    MaterialCreateForm,
    MaterialCreateFormValues
} from './material-create-form-control';

interface MaterialCreateFormControlProps extends FormikControlBaseProps<MaterialCreateFormValues> {
    readonly initialValues?: MaterialCreateFormValues;
}

interface MaterialCreateFormControlState {
    readonly loaded: boolean;
    readonly materialTypeOptions: OptionProps[];
}

export class MaterialCreateFormControl extends FormikControlBase<
    MaterialCreateFormValues,
    MaterialCreateFormControlProps,
    MaterialCreateFormControlState> {

    constructor(props: MaterialCreateFormControlProps) {
        super(props);

        const allExternalMaterialType = getAllExternalFurnitureMaterialType();
        this.state = {
            loaded: false,
            materialTypeOptions: this.listToOptions(allExternalMaterialType)
        };
    }

    public render() {
        const { initialValues } = this.props;
        const { materialTypeOptions } = this.state;

        return (
            <Formik
                ref={this.formInstance}
                initialValues={initialValues!}
                onSubmit={this.onSubmit}
            >
                {(formProps) => (
                    <MaterialCreateForm
                        materialOptions={materialTypeOptions}
                        {...formProps}
                    />
                )}
            </Formik>
        );
    }
}