import { FormikProps } from 'formik';
import * as React from 'react';

import { FormikError } from './FormError';

interface FormBodyProps {
    // tslint:disable-next-line:no-any
    readonly children?: any;
    readonly formProps: FormikProps<{}>;
    readonly autoComplete?: string;
    readonly wrapperClassName?: string;
}

export function FormBody(props: FormBodyProps) {
    const {
        handleSubmit,
    } = props.formProps;
    const { wrapperClassName } = props;
    
    return (
        <form onSubmit={handleSubmit} autoComplete={props.autoComplete}>
            <FormikError formProps={props.formProps} />
            <div className={wrapperClassName}>
                {props.children}
            </div>
        </form>
    );
}