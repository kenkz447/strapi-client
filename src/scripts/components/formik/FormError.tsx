import { Alert } from 'antd';
import { FormikProps } from 'formik';
import * as React from 'react';
import styled from 'styled-components';

const FormikErrorError = styled.div`
    margin-bottom: 24px;
`;

interface FormikErrorProps {
    readonly formProps: FormikProps<{}>;
}

export function FormikError(props: FormikErrorProps) {
    if (!props.formProps.status || !props.formProps.status.error) {
        return null;
    }

    return (
        <FormikErrorError>
            <Alert type="error" message={props.formProps.status.error} />
        </FormikErrorError>
    );
}