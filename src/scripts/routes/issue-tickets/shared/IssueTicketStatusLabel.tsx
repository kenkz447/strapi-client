import { Badge } from 'antd';
import { BadgeProps } from 'antd/lib/badge';
import * as React from 'react';

import { text } from '@/i18n';
import { IssueTicket } from '@/restful';

interface IssueTicketStatusLabelProps {
    readonly status: IssueTicket['status'];
}

export function IssueTicketStatusLabel({ status }: IssueTicketStatusLabelProps) {
    let badgeStatus = 'error' as BadgeProps['status'];

    if (status === 'processing') {
        badgeStatus = 'processing';
    } else if (status === 'close') {
        badgeStatus = 'success';
    }

    return <Badge status={badgeStatus} text={text(status)} />;
}