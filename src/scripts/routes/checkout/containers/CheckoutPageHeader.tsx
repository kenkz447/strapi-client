import { PageHeader } from 'ant-design-pro';
import { RootContext } from 'qoobee';
import * as React from 'react';

import { DomainContext } from '@/domain';
import { text } from '@/i18n';

const breadcrumbList = [{
    title: text('Dashboard'),
    href: '/'
}, {
    title: text('Checkout'),
}];

export interface CheckoutPageHeaderProps {
}

export class CheckoutPageHeader extends React.PureComponent<CheckoutPageHeaderProps> {
    static readonly contextType = RootContext;
    readonly context!: DomainContext;

    public render() {
        return (
            <PageHeader
                breadcrumbList={breadcrumbList}
            />
        );
    }
}