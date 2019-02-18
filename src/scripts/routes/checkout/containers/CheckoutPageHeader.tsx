import { PageHeader } from 'ant-design-pro';
import * as React from 'react';

import { RootContext } from '@/app';
import { DomainContext } from '@/domain';
import { text } from '@/i18n';
import { OrderDetail } from '@/restful';

const breadcrumbList = [{
    title: text('Home'),
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