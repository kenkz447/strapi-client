import { Icon, Modal, Upload } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import * as React from 'react';

import { getUploadedFileSrc } from '@/business/uploaded-file';
import { deleteUploadedFile } from '@/business/uploaded-file/actions';
import { IssueTicket, UploadedFile } from '@/restful';
import { getToken } from '@/utilities';

interface IssueTicketAttachmentsUploadProps {
    readonly issueTicket: IssueTicket;
}

interface IssueTicketAttachmentsUploadState {
    readonly previewVisible: boolean;
    readonly previewImage: string;
    readonly fileList: UploadFile[];
}

export class IssueTicketAttachmentsUpload extends React.PureComponent<
    IssueTicketAttachmentsUploadProps,
    IssueTicketAttachmentsUploadState
    > {
    constructor(props: IssueTicketAttachmentsUploadProps) {
        super(props);
        const { issueTicket } = props;
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: issueTicket.attachments
                ? issueTicket.attachments.map(this.uploadedFileToUploadFile)
                : []
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
        const { issueTicket } = this.props;
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
                    accept="image/png, image/jpeg"
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
                        refId: issueTicket.id,
                        ref: 'issueTicket',
                        field: nameof<IssueTicket>(o => o.attachments)
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
