import { Button } from 'antd';
import * as React from 'react';

import { BusinessController } from '@/business';
import { closeIssueTicket } from '@/business/issue-ticket';
import { text } from '@/i18n';
import { IssueTicket } from '@/restful';

export interface IssueTichetCloseButtonProps {
    readonly issueTicket: IssueTicket;
}

export function IssueTichetCloseButton({ issueTicket }: IssueTichetCloseButtonProps) {
    if (issueTicket.status === 'close') {
        return null;
    }

    return (
        <BusinessController
            action={closeIssueTicket}
            needsConfirm={true}
        >
            {({ doBusiness, loading }) => (
                <Button
                    onClick={() => doBusiness(issueTicket)}
                    loading={loading}
                    icon="check"
                >
                    {text('Close')}
                </Button>
            )}
        </BusinessController>
    );
}
