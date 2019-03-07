import { createBrowserHistory } from 'history';
import {
    AppCoreContext,
    BreakpointDetector,
    ErrorLogger,
    I18NLoader,
    RootProps
} from 'qoobee';
import * as React from 'react';

import { ErrorPage } from './components';
import {
    Authentication,
    ContextFetcher,
    FirebaseNotification,
    GlobalModal,
    MenusBuilder,
    policies,
    PrintHandler
} from './domain';
import { getCurrentLanguage } from './i18n';
import { RouterRoot } from './routes';

const browserHistory = createBrowserHistory();

const AppContent = () => (
    <ErrorLogger
        ErrorPage={ErrorPage}
    >
        <BreakpointDetector />
        <MenusBuilder />
        <ContextFetcher />
        <FirebaseNotification />
        <Authentication>
            <I18NLoader>
                <RouterRoot />
                <GlobalModal />
            </I18NLoader>
        </Authentication>
        <PrintHandler />
    </ErrorLogger>
);

const initialContext: Partial<AppCoreContext> = {
    history: browserHistory,
    policies: policies,
    currentLanguage: getCurrentLanguage()
};

export const getRootProps = (): RootProps => ({
    AppContent: AppContent,
    initialContext: initialContext
});