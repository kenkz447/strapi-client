import 'antd/dist/antd.less';
import './RouterRoot.scss';

import * as React from 'react';
import { withContext, WithContextProps } from 'react-context-service';
import { Route, Router, Switch } from 'react-router';

import { PageLoading } from '@/components';
import { AGENCY_PATH, ORDER_PATH } from '@/configs';
import {
    DomainContext,
    WithCurrentBreakpoint,
    WithCurrentUser,
    WithHistory
} from '@/domain';
import { BlankLayout, DefaultLayout } from '@/layout';

const AuthRoutes = React.lazy(() => import('./auth'));
const MainRoutes = React.lazy(() => import('./main'));
const OrderRoutes = React.lazy(() => import('./order'));
const AgencyRoutes = React.lazy(() => import('./agencies'));

type RouterRootContextProps =
    WithCurrentUser &
    WithHistory &
    WithCurrentBreakpoint &
    Pick<DomainContext, 'appState'>;

type RouterRootProps = WithContextProps<RouterRootContextProps>;

class RouterRoot extends React.PureComponent<RouterRootProps> {

    public render() {
        const { history } = this.props;

        return (
            <Router history={history}>
                <Switch>
                    <Route path="/auth">
                        <BlankLayout>
                            <React.Suspense fallback={<PageLoading />}>
                                <AuthRoutes />
                            </React.Suspense>
                        </BlankLayout>
                    </Route>
                    <Route path={ORDER_PATH}>
                        {this.orderRouteComponent}
                    </Route>
                    <Route path={AGENCY_PATH}>
                        {this.agenciesRouteComponent}
                    </Route>
                    <Route>
                        {this.mainRouteComponent}
                    </Route>
                </Switch>
            </Router>
        );
    }

    readonly mainRouteComponent = () => {
        const { appState, history, currentBreakpoint } = this.props;

        if (appState !== 'READY') {
            return null;
        }

        return (
            <DefaultLayout
                currentBreakpoint={currentBreakpoint}
                history={history}
            >
                <React.Suspense fallback={<PageLoading />}>
                    <MainRoutes />
                </React.Suspense>
            </DefaultLayout>
        );
    }

    readonly orderRouteComponent = () => {
        const { appState, history, currentBreakpoint } = this.props;

        if (appState !== 'READY') {
            return null;
        }

        return (
            <DefaultLayout
                currentBreakpoint={currentBreakpoint}
                history={history}
            >
                <React.Suspense fallback={<PageLoading />}>
                    <OrderRoutes />
                </React.Suspense>
            </DefaultLayout>
        );
    }

    readonly agenciesRouteComponent = () => {
        const { appState, history, currentBreakpoint } = this.props;

        if (appState !== 'READY') {
            return null;
        }

        return (
            <DefaultLayout
                currentBreakpoint={currentBreakpoint}
                history={history}
            >
                <React.Suspense fallback={<PageLoading />}>
                    <AgencyRoutes />
                </React.Suspense>
            </DefaultLayout>
        );
    }
}

export default withContext<RouterRootContextProps>(
    'history',
    'appState',
    'currentBreakpoint'
)(RouterRoot); 