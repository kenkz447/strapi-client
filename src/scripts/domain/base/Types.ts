import { ModalProps } from 'antd/lib/modal';
import { Moment } from 'moment';
import { WithContextProps } from 'react-context-service';
import { RouteComponentProps } from 'react-router';

import { AppCoreContext, PageProps } from '@/app';
import {
    FurnitureComponent,
    FurnitureComponentGroup,
    FurnitureComponentType,
    FurnitureMaterial,
    FurnitureMaterialType,
    User
} from '@/restful';

import { AuthClient } from './AuthClient';

export interface DefaultLayoutHeaderProps {
}

export type Print<P = {}> = {
    readonly Component: React.ComponentType<P>;
    readonly props: P;
};

export interface DomainContext extends AppCoreContext<User>, Product3DSenceContext {
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

export interface Product3DSenceContext {
    readonly selected3DObject: THREE.Object3D | null;
    readonly selectedFurnitureComponent: FurnitureComponent | null;
    readonly selectedFurnitureComponentType: FurnitureComponentType | null;
    readonly availableFurnitureComponents: FurnitureComponent[] | null;

    readonly selectedFurnitureMaterial: FurnitureMaterial | null;
    readonly selectedFurnitureMaterialType: FurnitureMaterialType | null;
    readonly availableFurnitureMaterials: FurnitureMaterial[] | null;

    readonly selectedFurnitureComponentGroup: FurnitureComponentGroup | null;
    
    readonly selectedFurnitureComponentHeight: number | null;
    readonly selectedFurnitureComponentDiameter: number | null;
    readonly selectedFurnitureComponentLengthinesss: number | null;
}

export type WithDomainContext<P = {}> = WithContextProps<DomainContext, P>;

export type AppPageProps<T = {}, P = {}> =
    RouteComponentProps<T> &
    WithDomainContext<P> &
    PageProps; 