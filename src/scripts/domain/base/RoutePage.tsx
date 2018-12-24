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
        if (InheritPage.hasOwnProperty('routeInfo')) {
            const routeInfo = InheritPage.routeInfo as RouteInfo;
            window.document.title = routeInfo.title;
        }
    }
}