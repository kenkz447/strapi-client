import { RouteInfo } from 'qoobee';
import * as React from 'react';
import styled from 'styled-components';

import { PageWrapper, SlideUp } from '@/components';
import { CONTACT_URL, getMobileUrl } from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';
import { text } from '@/i18n';
import {
    ProductTypeGroup,
    productTypeGroupResources,
    request
} from '@/restful';

import { MobileContact } from './containers';

type RouteMobilContactProps = AppPageProps<{ readonly id: string }>;

interface RouteMobilContactState {
    readonly productTypeGroups: ProductTypeGroup[];
}

export class RouteMobileContact extends RoutePage<
    RouteMobilContactProps,
    RouteMobilContactState
    > {
    static readonly routeInfo: RouteInfo = {
        path: getMobileUrl(CONTACT_URL),
        title: text('Contact'),
        exact: true
    };

    constructor(props: RouteMobilContactProps) {
        super(props);

        this.state = {
            productTypeGroups: []
        };

        this.fetchResources();
    }

    private readonly fetchResources = async () => {
        const [productTypeGroups] = await Promise.all([
            request(productTypeGroupResources.find),
        ]);

        this.setState({
            productTypeGroups: productTypeGroups
        });
    }

    render() {
        const { productTypeGroups } = this.state;

        return (
            <PageWrapper backgroundColor="#FFF">
                <SlideUp className="mh-100">
                    <MobileContact
                        productTypeGroups={productTypeGroups}
                    />
                </SlideUp>
            </PageWrapper>
        );
    }
}