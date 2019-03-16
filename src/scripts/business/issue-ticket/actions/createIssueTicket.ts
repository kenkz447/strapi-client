import { IssueTicket, issueTicketResources, request } from '@/restful';

export const createIssueTicket = (ticket: Partial<IssueTicket>) => {
    return request(
        issueTicketResources.create,
        {
            type: 'body',
            value: {
                ...ticket,
                date: new Date(),
            }
        });
};