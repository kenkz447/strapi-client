import * as React from 'react';
import { withContext, WithContextProps } from 'react-context-service';
import { Redirect, Route } from 'react-router-dom';

import { AccessControl } from '../containers';
import { PageProps, RouteInfo } from './Types';

type PageContructor = {
    readonly withContext?: Array<string>;
    readonly routeInfo: RouteInfo;
    readonly getPageKey?: (props: PageProps) => string | number | undefined;
};

// tslint:disable-next-line:no-any
type AppRouteComponentProps = WithContextProps<any>;
type AppRouteComponent = React.ComponentType<AppRouteComponentProps> & PageContructor;

export const route = (Component: AppRouteComponent) => {
    if (!Component.routeInfo) {
        throw Error('Default Props with routeProps needed in Route Component!');
    }

    const routeProps = Component.routeInfo;
    const initialContext = Component.withContext || [];

    // tslint:disable-next-line:no-any
    const WithContextInject = withContext(...initialContext)((props: any) => {
        const pageKey = Component.getPageKey && Component.getPageKey(props);
        return (
            <Component
                key={pageKey}
                {...props}
            />
        );
    });

    if (routeProps.policies) {
        return (
            <Route key={routeProps.path} {...routeProps}>
                {(componentProps) => {
                    return (
                        <AccessControl allowFor={routeProps.policies!}>
                            {(canAccess) => {
                                if (!canAccess) {
                                    return <Redirect to="/access-deny" />;
                                }

                                return <WithContextInject {...componentProps} />;
                            }}
                        </AccessControl>
                    );
                }}
            </Route>
        );
    }

    return (
        <Route key={routeProps.path} {...routeProps} component={WithContextInject} />
    );
};

export const routeFrom = (Components: AppRouteComponent[]) => Components.reduce(
    (currenValue: JSX.Element[], Component) => {
        return [...currenValue, route(Component)];
    },
    []
);