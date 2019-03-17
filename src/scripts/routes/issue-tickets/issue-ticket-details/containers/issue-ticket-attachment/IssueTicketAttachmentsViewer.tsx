import * as React from 'react';
import Gallery from 'react-grid-gallery';

import { getUploadedFileSrc } from '@/business/uploaded-file';
import { IssueTicket } from '@/restful';

interface IssueTicketAttachmentsViewerProps {
    readonly issueTicket: IssueTicket;
}

export class IssueTicketAttachmentsViewer extends React.PureComponent<IssueTicketAttachmentsViewerProps> {
    private readonly getImages = () => {
        const { issueTicket } = this.props;

        if (!issueTicket.attachments) {
            return [];
        }

        return issueTicket.attachments.map(o => {
            return {
                src: getUploadedFileSrc({ uploadedFile: o }),
                thumbnail: getUploadedFileSrc({ uploadedFile: o })
            };
        });
    }

    public render() {
        const images = this.getImages();
        return (
            <div>
                <Gallery
                    images={images}
                    enableImageSelection={false}
                />
            </div>
        );
    }
}
