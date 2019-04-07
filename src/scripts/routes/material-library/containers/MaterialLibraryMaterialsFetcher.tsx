import * as React from 'react';
import { RestfulDataContainer, RestfulRender } from 'react-restful';

import {
    furnitureMaterialResources,
    furnitureMaterialResourceType,
    FurnitureMaterialType,
    furnitureMaterialTypeResources,
    furnitureMaterialTypeResourceType
} from '@/restful';

import {
    MaterialLibraryMaterialList
} from './material-library-materials-fetcher';

interface MaterialLibraryMaterialsFetcherProps {
    readonly materialType: FurnitureMaterialType;
}

export class MaterialLibraryMaterialsFetcher extends React.PureComponent<MaterialLibraryMaterialsFetcherProps> {
    constructor(props: MaterialLibraryMaterialsFetcherProps) {
        super(props);
    }

    public render() {
        const { materialType } = this.props;
        return (
            <RestfulRender
                resource={furnitureMaterialResources.find}
                parameters={[{
                    type: 'query',
                    parameter: '_sort',
                    value: 'id:DESC'
                }, {
                    type: 'query',
                    parameter: 'materialType',
                    value: materialType.id
                }]}
            >
                {(render) => {
                    const { data, fetching } = render;
                    return (
                        <RestfulDataContainer
                            resourceType={furnitureMaterialResourceType}
                            initDataSource={data || []}
                        >
                            {(syncMaterial) => {
                                return (
                                    <MaterialLibraryMaterialList
                                        furnitureMaterials={syncMaterial}
                                        loading={fetching}
                                    />
                                );
                            }}
                        </RestfulDataContainer>
                    )
                }}
            </RestfulRender>
        );
    }
}
