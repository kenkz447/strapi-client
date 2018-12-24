import 'antd/dist/antd.less';
import './RouterRoot.scss';

import * as React from 'react';
import { withContext, WithContextProps } from 'react-context-service';
import { Route, Router, Switch } from 'react-router';

import { PageLoading } from '@/components';
import {
    DomainContext,
    WithCurrentBreakpoint,
    WithCurrentUser,
    WithHistory
} from '@/domain';
import { BlankLayout, DefaultLayout } from '@/layout';

const AuthRoutes = React.lazy(() => import('./auth'));
const MainRoutes = React.lazy(() => import('./main'));

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
}

export default withContext<RouterRootContextProps>(
    'history',
    'appState',
    'currentBreakpoint',
)(RouterRoot); 