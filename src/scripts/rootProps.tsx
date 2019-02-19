import { createBrowserHistory } from 'history';
import * as React from 'react';

import {
    AppCoreContext,
    BreakpointDetector,
    I18NLoader,
    LoadingBar,
    RootProps
} from './app';
import { DEFAULT_APP_LANG } from './configs';
import {
    Authentication,
    ContextFetcher,
    ErrorLogger,
    GlobalModal,
    policies,
    PrintHandler
} from './domain';
import MenusBuilder from './domain/services/MenusBuilder';
import { getCurrentLanguage } from './i18n';
import { RouterRoot } from './routes';

const browserHistory = createBrowserHistory();

const AppContent = () => (
    <ErrorLogger>
        <LoadingBar />
        <ContextFetcher />
        <BreakpointDetector />
        <MenusBuilder />
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