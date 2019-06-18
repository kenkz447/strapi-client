import 'antd/dist/antd.less';
import 'ant-design-pro/lib/DescriptionList/style/css';
import 'ant-design-pro/lib/Charts/style/css';
import './RouterRoot.scss';

import * as React from 'react';
import { withContext, WithContextProps } from 'react-context-service';
import { Redirect, Route, Router, Switch } from 'react-router';

import { PageLoading } from '@/components';
import {
    AGENCIES_URL,
    AUTH_PATH,
    CATALOG_BASE_PATH,
    getMobileUrl,
    MOBILE_URL_PREFIX,
    MOBILE_VIEWPORTS,
    ORDER_PATH,
    PROFILE_URL
} from '@/configs';
import {
    DomainContext,
    WithCurrentBreakpoint,
    WithCurrentUser,
    WithHistory
} from '@/domain';
import { BlankLayout, DefaultLayout, MobileLayout } from '@/layout';
import { ProfileLayout } from '@/layout/child-layout';

const AuthRoutes = React.lazy(() => import('./auth'));
const MainRoutes = React.lazy(() => import('./main'));
const OrderRoutes = React.lazy(() => import('./order'));
const AgencyRoutes = React.lazy(() => import('./agencies'));
const ProfileRoutes = React.lazy(() => import('./profile'));
const MobileRoutes = React.lazy(() => import('./mobile'));

type RouterRootContextProps =
    WithCurrentUser &
    WithHistory &
    WithCurrentBreakpoint &
    Pick<DomainContext, 'appState'>;

type RouterRootProps = WithContextProps<RouterRootContextProps>;

class RouterRoot extends React.PureComponent<RouterRootProps> {

    public render() {
        const { currentBreakpoint, history } = this.props;

        const isMobile = MOBILE_VIEWPORTS.includes(currentBreakpoint);

        return (
            <Router history={history}>
                {
                    isMobile
                        ? this.renderMobileHandler()
                        : this.renderRouterContent()
                }
            </Router>
        );
    }

    private readonly renderMobileHandler = () => {
        const toUrl = getMobileUrl(CATALOG_BASE_PATH);

        return (
            <Switch>
                <Route path="/auth">
                    {this.authRouteComponent()}
                </Route>
                <Route
                    path={MOBILE_URL_PREFIX}
                    component={this.mobileRouteComponent}
                />
                <Route>
                    {() => <Redirect to={toUrl} />}
                </Route>
            </Switch>
        );
    }

    readonly renderRouterContent = () => {

        return (
            <Switch>
                <Route path="/auth">
                    {this.authRouteComponent()}
                </Route>
                <Route
                    path={PROFILE_URL}
                    component={this.profileRouteComponent}
                />
                <Route path={ORDER_PATH}>
                    {this.orderRouteComponent}
                </Route>
                <Route path={AGENCIES_URL}>
                    {this.agenciesRouteComponent}
                </Route>
                <Route>
                    {this.mainRouteComponent}
                </Route>
            </Switch>
        );
    }

    readonly authRouteComponent = () => {
        return (
            <BlankLayout>
                <React.Suspense fallback={<PageLoading />}>
                    <AuthRoutes />
                </React.Suspense>
            </BlankLayout>
        );
    }

    readonly mobileRouteComponent = () => {
        const { appState, history, currentBreakpoint } = this.props;
        
        if (!appState) {
            return null;
        }

        return (
            <MobileLayout
                currentBreakpoint={currentBreakpoint}
                history={history}
            >
                <React.Suspense fallback={<PageLoading />}>
                    <MobileRoutes />
                </React.Suspense>
            </MobileLayout>
        );
    }

    readonly mainRouteComponent = () => {
        const { appState, history, currentBreakpoint } = this.props;

        if (!appState) {
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

    readonly profileRouteComponent = () => {
        const { appState, history, currentBreakpoint } = this.props;

        if (appState !== 'READY') {
            return null;
        }

        return (
            <DefaultLayout
                currentBreakpoint={currentBreakpoint}
                history={history}
            >
                <ProfileLayout>
                    <React.Suspense fallback={<PageLoading />}>
                        <ProfileRoutes />
                    </React.Suspense>
                </ProfileLayout>
            </DefaultLayout>
        );
    }
}

export default withContext<RouterRootContextProps>(
    'history',
    'appState',
    'currentBreakpoint'
)(RouterRoot); 