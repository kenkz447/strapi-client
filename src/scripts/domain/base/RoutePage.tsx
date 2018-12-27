import * as React from 'react';

import { RouteInfo } from '@/app';

import { AppPageProps } from './';

export class RoutePage<P extends AppPageProps = AppPageProps, S= {}>
    extends React.PureComponent<P, S> {

    get title() {
        const InheritPage = Object.getPrototypeOf(this).constructor;
        if (!InheritPage.hasOwnProperty('routeInfo')) {
            return 'Untitle page';
        }
        const routeInfo = InheritPage.routeInfo as RouteInfo;
        return typeof routeInfo.title === 'string' ? routeInfo.title : routeInfo.title(this.props, this.state);
    }

    constructor(props: P) {
        super(props);
        const { setContext } = props;

        setContext({
            drawerVisibled: false
        });

        this.setDocumentTitle();
    }

    readonly setDocumentTitle = () => {
        document.title = this.title;
    }

    componentDidUpdate() {
        this.setDocumentTitle();
    }
}