import { ModalProps } from 'antd/lib/modal';
import { Moment } from 'moment';
import { WithContextProps } from 'react-context-service';
import { RouteComponentProps } from 'react-router';

import { AppCoreContext } from '@/app';
import {
    Agency,
    FurnitureComponent,
    FurnitureComponentGroup,
    FurnitureComponentType,
    FurnitureMaterial,
    FurnitureMaterialType,
    OrderDetail,
    ProductExtended,
    User
} from '@/restful';

import { AuthClient } from './AuthClient';

export interface DefaultLayoutHeaderProps {
}

export type Print<P = {}> = {
    readonly Component: React.ComponentType<P>;
    readonly props: P;
};

export interface AppNotification {
    readonly id?: string;
    readonly time?: string;
    readonly type: 'new-order' | 'update-order' | 'cancel-order' | 'change-order' | 'new-order-transaction';
    readonly orderId?: string;
    readonly orderRransactionId?: string;
    readonly fromUserId?: string;
    readonly fromUserName?: string;
    readonly fromAgencyId?: string;
    readonly fromAgencyName?: string;
    readonly viewedAt?: string;
}
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
    readonly initOrderDetails: Array<OrderDetail>;
    readonly currentAgency?: Agency;

    readonly notifications: AppNotification[];
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
    readonly selectedFurnitureComponentIndex: number | null;
    readonly selectedFurnitureComponentType: FurnitureComponentType | null;
    readonly availableFurnitureComponents: FurnitureComponent[] | null;

    readonly selectedFurnitureMaterial: FurnitureMaterial | null;
    readonly selectedFurnitureMaterialType: FurnitureMaterialType | null;
    readonly availableFurnitureMaterials: FurnitureMaterial[] | null;

    readonly selectedFurnitureComponentGroup: FurnitureComponentGroup | null;

    readonly selectedFurnitureComponentHeight: number | null;
    readonly selectedFurnitureComponentDiameter: number | null;
    readonly selectedFurnitureComponentLengthiness: number | null;

    readonly availableFurnitureComponentHeight: Array<number> | null;
    readonly availableFurnitureComponentDiameter: Array<number> | null;
    readonly availableFurnitureComponentLengthiness: Array<number> | null;

    readonly selectedProduct: ProductExtended | null;
    readonly product3DSenceLoading: boolean | null;
    readonly takeProduct3DScreenshot: () => Promise<string>;
}

export type WithDomainContext<P = {}> = WithContextProps<DomainContext, P>;

export type AppPageProps<T = {}, P = {}> =
    RouteComponentProps<T> &
    WithDomainContext<P>;