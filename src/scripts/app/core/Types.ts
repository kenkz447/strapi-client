import { History } from 'history';
import { RouteProps } from 'react-router';

import { AppCoreContext } from '@/app';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// tslint:disable-next-line:no-any
export type Policy = (context: any) => boolean;

export type BreakPoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export interface AppCoreContext<U = {}> {
    readonly currentUser: U;
    readonly history: History;
    readonly appState?: 'LOADING' | 'READY';
    readonly policies?: { readonly [key: string]: Policy };
    readonly currentBreakpoint: BreakPoint;
    readonly currentLanguage: string;
    readonly translations?: { readonly [key: string]: object };
}

export interface RouteInfo extends RouteProps {
    readonly path: string;
    readonly title: string;
    readonly icon?: JSX.Element;
    readonly policies?: string[] | Policy[];
    readonly isActive?: () => boolean;
}

export interface PageProps {
    readonly routeInfo: RouteInfo;
}

export interface Menu<P = {}> {
    readonly isRoot?: boolean;
    readonly label?: JSX.Element | string;
    readonly href?: string;
    readonly children?: Menu[];
    readonly component: React.ComponentType<P>;
    readonly componentProps?: P;
}