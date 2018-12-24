import { Button, Divider, Form } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import { FormItemProps } from 'antd/lib/form';
import { FormikProps } from 'formik';
import * as React from 'react';

const resetButtonStyle: React.CSSProperties = {
    marginLeft: 10
};

interface FormSubmitButtonProps {
    readonly formProps: FormikProps<{}>;
    readonly formItemProps?: FormItemProps;
    readonly showReset?: boolean;
}

function FormSubmitButtonComponent(props: FormSubmitButtonProps & ButtonProps) {
    const { formProps, formItemProps, showReset, ...buttonProps } = props;
    const button = (
        <Button
            loading={formProps.isSubmitting}
            htmlType="submit"
            type="primary"
            disabled={!formProps.dirty || formProps.isSubmitting}
            {...buttonProps}
        />
    );

    if (formItemProps) {
        return (
            <Form.Item {...formItemProps}>
                {button}
                {
                    showReset && (
                        <React.Fragment>
                            <Button
                                style={resetButtonStyle}
                                onClick={() => formProps.resetForm(formProps.initialValues)}
                                hidden={!formProps.dirty}
                            >
                                Đặt lại
                            </Button>
                        </React.Fragment>
                    )
                }
            </Form.Item>
        );
    }

    return button;
}

export const FormSubmit = React.memo<FormSubmitButtonProps & ButtonProps>(FormSubmitButtonComponent);