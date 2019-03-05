import { History } from 'history';
import { RouteProps } from 'react-router';

import { AppCoreContext } from '@/app';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// tslint:disable-next-line:no-any
export type Policy = (context: any, funcKey?: string) => boolean;

export type BreakPoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export interface MenuItem {
    readonly url: string;
    readonly icon?: string;
    readonly label: string;
}

export interface AppCoreContext<U = {}> {
    readonly currentUser: U;
    readonly history: History;
    readonly appState?: 'LOADING' | 'READY';
    readonly policies?: { readonly [key: string]: Policy };
    readonly currentBreakpoint: BreakPoint;
    readonly currentLanguage: string;
    readonly translations?: { readonly [key: string]: object };
    readonly menus?: { readonly [key: string]: MenuItem[] };
}

export interface RouteInfo<P = {}, S = {}> extends RouteProps {
    readonly path: string;
    readonly title: string | ((props: P, state: S) => string);
    readonly icon?: JSX.Element;
    readonly policies?: string[] | Policy[];
    readonly isActive?: () => boolean;
}

export interface Menu<P = {}> {
    readonly isRoot?: boolean;
    readonly label?: JSX.Element | string;
    readonly href?: string;
    readonly children?: Menu[];
    readonly component: React.ComponentType<P>;
    readonly componentProps?: P;
}

export interface Permission {
    readonly key: string;
    readonly url?: RegExp;
}

export interface Role {
    readonly key: string;
    readonly allowed: Permission[];
    readonly redirects?: Array<{ readonly test: RegExp; readonly target: string; }>;
}