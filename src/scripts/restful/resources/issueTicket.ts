import { Resource, ResourceType } from 'react-restful';
import * as yup from 'yup';

import { getDefaultParamsForUpdate } from '../base';
import { Agency } from './agency';
import { IssueTicketReply } from './issueTicketReply';
import { Order } from './order';
import { UploadedFile } from './uploadedFile';
import { User, userSchema } from './user';

export type IssueTicketStatus = 'open' | 'processing' | 'close';

export interface IssueTicket {
    readonly id?: string;
    readonly title: string;
    readonly description: string;
    readonly openDate: Date | string;
    readonly closeDate?: string;
    readonly attachments?: UploadedFile[];
    readonly status: IssueTicketStatus;
    readonly created_by: User;
    readonly receivedBy?: User;
    readonly agency: Agency;
    readonly code: string;
    readonly issueTicketReplies?: IssueTicketReply[];
    readonly order?: Order;
}

export const issueTicketSchema = yup.object().shape<IssueTicket>({
    description: yup.string(),
    id: yup.string().required(),
    title: yup.string().required(),
    status: yup.mixed().oneOf(['open', 'processing', 'close'] as IssueTicketStatus[]),
    openDate: yup.date().required(),
    created_by: userSchema.nullable(true).default(null),
    agency: yup.object(),
    code: yup.string().required(),
});

export const issueTicketResourceType = new ResourceType<IssueTicket>({
    name: nameof<IssueTicket>()
});

export const issueTicketResources = {
    find: new Resource<IssueTicket, IssueTicket[]>({
        resourceType: issueTicketResourceType,
        url: '/issueTickets'
    }),
    findOne: new Resource<IssueTicket>({
        resourceType: issueTicketResourceType,
        url: '/issueTickets/:id'
    }),
    create: new Resource<IssueTicket>({
        resourceType: issueTicketResourceType,
        url: '/issueTickets',
        method: 'POST'
    }),
    close: new Resource<IssueTicket>({
        resourceType: issueTicketResourceType,
        url: '/issueTickets/close/:id',
        method: 'PUT',
        getDefaultParams: getDefaultParamsForUpdate
    })
};