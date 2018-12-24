import { Button, Form, message } from 'antd';
import { FormItemProps } from 'antd/lib/form';
import Upload, { UploadProps } from 'antd/lib/upload';
import { string } from 'prop-types';
import * as React from 'react';
import styled from 'styled-components';

import { getToken } from '@/utilities';

const FormUploadWrapper = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    .upload-thumb {
        width: 150px;
        height: 150px;
        border: 1px solid #d9d9d9;
        margin-right: 15px;
        border-radius: 6px;
        padding: 5px;
        img {
            max-width: 100%;
            width: 100%;
            height: auto;
        }
    }
    .upload-extra {
        line-height: 1.5;
        color: gray;
        margin-bottom: 0;
    }
`;

interface FormFieldProps extends FormItemProps {
    readonly name: string;
    readonly value?: {
        readonly url: string
    };
    readonly setFieldValue: (fieldName: string, value: string, shouldValidate: boolean) => void;
    readonly useFieldWrapper?: boolean;
    readonly touched?: boolean;
}

function FormUploadComponent(props: FormFieldProps) {
    const {
        useFieldWrapper,
        label,
        required,
        help,
        validateStatus,
        labelCol,
        wrapperCol,
        touched,
        value,
        setFieldValue,
        name
    } = props;

    const input = (
        <FormUploadWrapper>
            <div className="upload-thumb">
                {value ? <img src={value.url} /> : null}
            </div>
            <div>
                <Upload
                    action={`${API_ENTRY}/Photos`}
                    headers={{
                        authorization: `Bearer ${getToken()}`
                    }}
                    name="fileImageCollect"
                    accept="image/png, image/jpeg"
                    multiple={false}
                    showUploadList={false}
                    onChange={(info) => {
                        if (info.file.status === 'done') {
                            message.success(`${info.file.name} file uploaded successfully`);
                            const { response } = info.file;
                            return void setFieldValue(name, response.data, true);
                        }

                        if (info.file.status === 'error') {
                            message.error(`${info.file.name} file upload failed.`);
                        }
                    }}
                >
                    <Button type="primary" icon="upload">Tải ảnh lên</Button>
                </Upload>
                <p className="upload-extra">
                    Hỗ trợ các định dạng ảnh: <br />
                    (.PNG .JPG .JPEG)
                </p>
            </div>

        </FormUploadWrapper>
    );

    const isError = validateStatus === 'error';
    const helpMessage = (!isError && help) ? help : (isError && touched) && help;

    if (useFieldWrapper) {
        return (
            <Form.Item
                labelCol={labelCol}
                wrapperCol={wrapperCol}
                label={label}
                required={required}
                help={helpMessage}
                validateStatus={touched ? validateStatus : undefined}
            >
                {input}
            </Form.Item>
        );
    }

    return input;
}

FormUploadComponent.defaultProps = {
    useFieldWrapper: true
} as FormFieldProps;

export const FormUpload = React.memo(FormUploadComponent);