import { Icon, Modal, Upload } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import * as React from 'react';

import { getUploadedFileSrc } from '@/business/uploaded-file';
import { deleteUploadedFile } from '@/business/uploaded-file/actions';
import { Order, UploadedFile } from '@/restful';
import { getToken } from '@/utilities';

interface OrderDetailsPhotosUploadProps {
    readonly order: Order;
}

interface OrderDetailsPhotosUploadState {
    readonly previewVisible: boolean;
    readonly previewImage: string;
    readonly fileList: UploadFile[];
}

export class OrderDetailsPhotosUpload extends React.PureComponent<
    OrderDetailsPhotosUploadProps,
    OrderDetailsPhotosUploadState
    > {
    constructor(props: OrderDetailsPhotosUploadProps) {
        super(props);
        const { order } = props;
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: order.photos.map(this.uploadedFileToUploadFile)
        };
    }

    private readonly uploadedFileToUploadFile = (file: UploadedFile): UploadFile => {
        return ({
            url: getUploadedFileSrc({ uploadedFile: file }),
            fileName: file.name,
            size: file.size,
            type: 'image',
            uid: file.id,
            status: 'done',
            name: file.name,
        });
    }

    readonly handleCancel = () => this.setState({ previewVisible: false });

    readonly handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    readonly handleChange = ({ fileList }) => {
        const isUploading = fileList.filter(o => o.status === 'uploading');
        if (isUploading && isUploading.length) {
            this.setState({
                fileList: fileList
            });

            return;
        }

        let uploadedFiles = fileList.filter(o => !!o.url);
        const uploadingFiles = fileList.filter(o => !!o.response);
        if (uploadingFiles) {
            for (const uploadingFile of uploadingFiles) {
                uploadedFiles.push(
                    this.uploadedFileToUploadFile(uploadingFile.response[0])
                );
            }
        }

        this.setState({
            fileList: uploadedFiles
        });
    }

    public render() {
        const { order } = this.props;
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        return (
            <div className="clearfix">
                <Upload
                    name="files"
                    action={`${API_ENTRY}/upload`}
                    listType="picture-card"
                    headers={{
                        authorization: `Bearer ${getToken()}`,
                        'X-Requested-With': null as any
                    }}
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    data={{
                        refId: order.id,
                        ref: 'order',
                        field: 'photos'
                    }}
                    multiple={true}
                    onRemove={(file) => {
                        deleteUploadedFile({ id: file.uid });
                    }}
                >
                    {uploadButton}
                </Upload>
                <Modal
                    visible={previewVisible}
                    footer={null}
                    onCancel={this.handleCancel}
                    closable={false}
                >
                    <img alt="example" className="w-100" src={previewImage} />
                </Modal>
            </div>
        );
    }
}
