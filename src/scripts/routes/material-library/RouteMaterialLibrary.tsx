import { RouteInfo } from 'qoobee';
import * as React from 'react';

import {
    PageContent,
    PageHeader,
    PageLoading,
    PageWrapper
} from '@/components';
import { MATERIAL_LIBRARY_URL } from '@/configs';
import { AppPageProps, DomainContext, RoutePage } from '@/domain';
import { text } from '@/i18n';
import {
    FurnitureMaterialType,
    furnitureMaterialTypeResources,
    request
} from '@/restful';

import { MaterialLibraryMaterialsFetcher } from './containers';
import {
    MaterialLibraryPageHeader
} from './containers/MaterialLibraryPageHeader';

type RouteMaterialLibraryProps = AppPageProps;

interface RouteMaterialLibraryState {
    readonly allowLoad?: boolean;
    readonly materialTypes?: FurnitureMaterialType[];
}

export class RouteMaterialLibrary extends RoutePage<RouteMaterialLibraryProps, RouteMaterialLibraryState> {
    static readonly routeInfo: RouteInfo = {
        path: MATERIAL_LIBRARY_URL,
        title: text('Material library'),
        exact: true
    };

    static readonly withContext = [nameof<DomainContext>(o => o.currentAgency)];

    constructor(props: RouteMaterialLibraryProps) {
        super(props);

        this.state = {
            // state
        };

        this.fetchResources();
    }

    private readonly fetchResources = async () => {
        const [materialTypes] = await Promise.all([
            request(
                furnitureMaterialTypeResources.find,
                [{
                    type: 'query',
                    parameter: 'isExternal',
                    value: true
                }]
            ),
        ]);

        this.setState({
            allowLoad: true,
            materialTypes: materialTypes,
        });
    }

    private readonly getCurrentMaterialType = () => {
        const { allowLoad, materialTypes } = this.state;

        return materialTypes![0];
    }

    public render() {
        const { allowLoad, materialTypes } = this.state;
        if (!allowLoad) {
            return (<PageLoading />);
        }

        const currentMaterialType = this.getCurrentMaterialType();

        return (
            <PageWrapper>
                <MaterialLibraryPageHeader
                    title={this.title}
                    materialTypes={materialTypes}
                />
                <PageContent>
                    <MaterialLibraryMaterialsFetcher
                        materialType={currentMaterialType}
                    />
                </PageContent>
            </PageWrapper>
        );
    }
}