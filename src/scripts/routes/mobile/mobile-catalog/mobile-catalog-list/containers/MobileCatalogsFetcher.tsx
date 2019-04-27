import './MobileCatalogsFetcher.scss';

import { Card, Tabs } from 'antd';
import { RootContext } from 'qoobee';
import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { Loading } from '@/components';
import { CATALOG_URL, getMobileUrl } from '@/configs';
import { DomainContext } from '@/domain';
import {
    Catalog,
    catalogResources,
    ProductType,
    ProductTypeGroup
} from '@/restful';
import { replaceRoutePath } from '@/utilities';

import { CatalogList } from './catalogs-fetcher';

export interface CatalogsFetcherProps {
    readonly productTypes: ProductType[];
    readonly productTypeGroups: ProductTypeGroup[];
    readonly selectedProductTypeGroup?: string;
}

export class CatalogsFetcher extends React.PureComponent<CatalogsFetcherProps> {
    public static readonly contextType = RootContext;
    public readonly context!: DomainContext;

    private readonly onTabClick = (tabKey: CatalogsFetcherProps['selectedProductTypeGroup']) => {
        const { history } = this.context;

        const nextUrl = replaceRoutePath(
            getMobileUrl(CATALOG_URL),
            {
                productTypeGroup: tabKey
            }
        );

        history.replace(nextUrl);
    }

    public render() {
        const { selectedProductTypeGroup, productTypeGroups } = this.props;

        return (
            <Card
                className="mobie-catalogs-fetcher"
                bordered={false}
                title={(
                    <Tabs
                        size="large"
                        activeKey={selectedProductTypeGroup}
                        defaultActiveKey="posts"
                        onTabClick={this.onTabClick}
                    >
                        {
                            productTypeGroups.map(o => {
                                return (
                                    <Tabs.TabPane tab={o.name} key={o.id} />
                                );
                            })
                        }
                    </Tabs>
                )}
            >
                {
                    selectedProductTypeGroup && (
                        <RestfulRender
                            initData={[]}
                            initFetch={true}
                            resource={catalogResources.find}
                            parameters={{
                                parameter: nameof<Catalog>(o => o.productTypeGroup),
                                type: 'query',
                                value: selectedProductTypeGroup
                            }}
                        >
                            {(render) => {
                                const { data, fetching } = render;
                                if (fetching) {
                                    return <Loading />;
                                }

                                return <CatalogList catalogs={data!} />;
                            }}
                        </RestfulRender>
                    )
                }
            </Card>
        );
    }
}
