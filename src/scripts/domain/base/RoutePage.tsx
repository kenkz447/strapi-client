import * as React from 'react';

import { RouteInfo } from '@/app';

import { AppPageProps } from './';

export class RoutePage<P extends AppPageProps = AppPageProps, S= {}>
    extends React.PureComponent<P, S> {

    constructor(props: P) {
        super(props);
        const { setContext } = props;

        setContext({
            drawerVisibled: false
        });

        this.setDocumentTitle();
    }

    readonly setDocumentTitle = () => {
        const InheritPage = Object.getPrototypeOf(this).constructor;
        if (!InheritPage.hasOwnProperty('routeInfo')) {
            return;
        }

        const routeInfo = InheritPage.routeInfo as RouteInfo;
        if (typeof routeInfo.title === 'string') {
            window.document.title = routeInfo.title;
            return;
        }

        const title = routeInfo.title();
        window.document.title = title;
    }

    readonly getPageTitle = () => {
        const InheritPage = Object.getPrototypeOf(this).constructor;
        if (!InheritPage.hasOwnProperty('routeInfo')) {
            return;
        }
        const routeInfo = InheritPage.routeInfo as RouteInfo;
        return typeof routeInfo.title === 'string' ? routeInfo.title : routeInfo.title();
    }
}