import { Formik } from 'formik';
import * as React from 'react';

import { FormikControlBase, FormikControlBaseProps } from '@/components';

import {
    BusinessInfomationForm,
    BusinessInfomationFormValues
} from './business-infomation-form-control';

interface BusinessInfomationFormControlProps extends FormikControlBaseProps<BusinessInfomationFormValues> {
    readonly readOnly?: boolean;
    readonly hideSubmitBtn?: boolean;
}

interface BusinessInfomationFormControlState {
}

export class BusinessInfomationFormControl extends FormikControlBase<
    BusinessInfomationFormValues,
    BusinessInfomationFormControlProps,
    BusinessInfomationFormControlState> {

    public render() {
        const { initialValues, readOnly, hideSubmitBtn } = this.props;

        return (
            <Formik
                ref={this.formInstance}
                initialValues={initialValues!}
                onSubmit={this.onSubmit}
                enableReinitialize={true}
            >
                {(formProps) => (
                    <BusinessInfomationForm
                        {...formProps}
                        readOnly={readOnly}
                        hideSubmitBtn={hideSubmitBtn}
                    />
                )}
            </Formik>
        );
    }
}