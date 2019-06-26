import { UnregisterCallback } from 'history';
import { events } from 'qoobee';
import * as React from 'react';
import { withContext, WithContextProps } from 'react-context-service';

import { DomainContext } from '@/domain';
import {
    productDesignResources,
    productTypeGroupResources,
    productTypeResources,
    request
} from '@/restful';
import {
    CLEAR_3D_SENCE_SELECT_EVENT
} from '@/routes/product/RouteProductContext';
import { getUrlSearchParam } from '@/utilities';

import {
    MobileProductTypeSelect,
    MobileProductTypeSelectProps
} from './mobile-product-types';

interface MobileProductTypesProps {
}

type MobileProductTypesContext =
    Pick<DomainContext, 'history'>
    & Pick<DomainContext, 'selectedFurnitureComponent'>
    & Pick<DomainContext, 'selectedFurnitureMaterial'>
    & Pick<DomainContext, 'selected3DObject'>;

interface MobileProductTypesState extends MobileProductTypeSelectProps {
    readonly currentProductDesignId: string | null;
}

class MobileProductTypesComponent extends React.PureComponent<
    WithContextProps<MobileProductTypesContext, MobileProductTypesProps>,
    MobileProductTypesState
    > {

    static readonly getDerivedStateFromProps = (
        nextProps: MobileProductTypesProps,
        state: MobileProductTypesState
    ): MobileProductTypesState | null => {
        const nextProductDesignId = getUrlSearchParam('productDesign');

        if (state.currentProductDesignId !== nextProductDesignId) {
            return {
                ...state,
                currentProductDesignId: nextProductDesignId,
            };
        }

        return null;
    }

    readonly unlistenHistory: UnregisterCallback;
    _isUnmounting!: boolean;

    constructor(props: WithContextProps<MobileProductTypesContext, MobileProductTypesProps>) {
        super(props);

        const { history } = props;

        this.state = {
            allProductDesign: [],
            allProductType: [],
            allProductTypeGroups: [],
            currentProductDesignId: getUrlSearchParam('productDesign')
        };

        this.fetchResources();

        this.unlistenHistory = history.listen(() => {
            if (this._isUnmounting) {
                return;
            }

            const { currentProductDesignId } = this.state;
            const nextProductDesignId = getUrlSearchParam('productDesign');

            if (currentProductDesignId === nextProductDesignId) {
                return;
            }

            this.onDesignChange();
        });
    }

    private readonly fetchResources = async () => {
        const resources = await Promise.all([
            request(productDesignResources.find),
            request(productTypeResources.find),
            request(productTypeGroupResources.find),
        ]);

        this.setState({
            allProductDesign: resources[0],
            allProductType: resources[1],
            allProductTypeGroups: resources[2]
        });
    }

    private readonly onDesignChange = () => {
        events.emit(CLEAR_3D_SENCE_SELECT_EVENT);
    }

    public componentWillUnmount() {
        this._isUnmounting = true;
        this.unlistenHistory();
    }

    public render() {
        const {
            allProductTypeGroups,
            allProductType,
            allProductDesign
        } = this.state;

        return (
            <MobileProductTypeSelect
                allProductTypeGroups={allProductTypeGroups}
                allProductType={allProductType}
                allProductDesign={allProductDesign}
            />
        );
    }
}

export const MobileProductTypes = withContext<MobileProductTypesContext, MobileProductTypesProps>(
    'history',
    'selectedFurnitureComponent',
    'selectedFurnitureMaterial'
)(MobileProductTypesComponent);