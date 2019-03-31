import { LocaleProvider } from 'antd';
import vi_VN from 'antd/lib/locale-provider/vi_VN';
import { createBrowserHistory } from 'history';
import moment from 'moment';
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

moment.locale('vi');

const browserHistory = createBrowserHistory();

const AppContent = () => (
    <LocaleProvider locale={vi_VN}>
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
    </LocaleProvider>
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