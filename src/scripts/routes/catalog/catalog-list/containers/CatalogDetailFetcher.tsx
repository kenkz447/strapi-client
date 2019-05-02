import { Card, Icon } from 'antd';
import { RootContext } from 'qoobee';
import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { Loading } from '@/components';
import { CATALOG_BASE_PATH } from '@/configs';
import { DomainContext } from '@/domain';
import { catalogResources } from '@/restful';

import { CatalogDetail } from './catalog-detail-fetcher';

export interface CatalogDetailFetcherProps {
    readonly catalogId: string;
}

export class CatalogDetailFetcher extends React.PureComponent<CatalogDetailFetcherProps> {
    public static readonly contextType = RootContext;
    public readonly context!: DomainContext;

    private readonly goBackBtnClick = () => {
        const { history } = this.context;
        if (history.action === 'PUSH') {
            return void history.goBack();
        }

        history.replace(CATALOG_BASE_PATH);
    }

    public render() {
        const { catalogId } = this.props;
        return (
            <Card
                style={{ minHeight: 'calc(100% - 24px)', marginTop: '24px' }}
                bordered={false}
                title={<Icon onClick={this.goBackBtnClick} className="clickable" type="arrow-left" />}
            >
                <RestfulRender
                    resource={catalogResources.findOne}
                    parameters={{
                        type: 'path',
                        parameter: 'id',
                        value: catalogId
                    }}
                >
                    {(render) => {
                        const { data, fetching } = render;
                        if (fetching) {
                            return <Loading />;
                        }

                        return <CatalogDetail catalog={data!} />;
                    }}
                </RestfulRender>
            </Card>
        );
    }
}