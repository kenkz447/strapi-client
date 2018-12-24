import { ModalProps } from 'antd/lib/modal';
import { Moment } from 'moment';
import { WithContextProps } from 'react-context-service';
import { RouteComponentProps } from 'react-router';

import { AppCoreContext, PageProps } from '@/app';
import { User } from '@/restful';

import { AuthClient } from './AuthClient';

export interface DefaultLayoutHeaderProps {
    readonly title: React.ReactNode;
    readonly actions?: React.ReactNode;
    readonly hideBranchSelect?: boolean;
    readonly defaultBackUrl?: string;
    readonly showDatePicker?: 'single' | 'range';
}

export type Print<P = {}> = {
    readonly Component: React.ComponentType<P>;
    readonly props: P;
};

export interface DomainContext extends AppCoreContext<User> {
    readonly authClient: AuthClient<User>;
    readonly drawerVisibled?: boolean;
    readonly showPageLoading?: boolean;
    readonly globalModal?: ModalProps & { readonly children?: React.ReactNode } | null;
    readonly globalModalProgressing?: boolean;
    readonly globalModalVisibled?: boolean;
    readonly pageHeaderProps?: DefaultLayoutHeaderProps | null;
    readonly selectedDate?: Moment | null;
    readonly selectedDateRange?: [Moment, Moment] | null;
    readonly showPrint?: Print | null;
}

export type WithCurrentBreakpoint = Pick<DomainContext, 'currentBreakpoint'>;
export type WithCurrentUser = Pick<DomainContext, 'currentUser'>;
export type WithAuthClient = Pick<DomainContext, 'authClient'>;
export type WithHistory = Pick<DomainContext, 'history'>;
export type WithGlobalModal =
    Pick<DomainContext, 'globalModal'> &
    Pick<DomainContext, 'globalModalProgressing'> &
    Pick<DomainContext, 'globalModalVisibled'>;

export type WithSelectedDate = Pick<DomainContext, 'selectedDate'>;
export type WithSelectedDateRange = Pick<DomainContext, 'selectedDateRange'>;
export type WithShowPrint = Pick<DomainContext, 'showPrint'>;

export type WithDomainContext<P = {}> = WithContextProps<DomainContext, P>;

export type AppPageProps<T = {}, P = {}> =
    RouteComponentProps<T> &
    WithDomainContext<P> &
    PageProps; 