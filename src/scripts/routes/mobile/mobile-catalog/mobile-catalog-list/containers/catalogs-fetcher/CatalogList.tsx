import { List } from 'antd';
import * as React from 'react';
import styled from 'styled-components';

import { Catalog } from '@/restful';

import { CatalogListItem } from './catalog-list';

const CatalogListWrapper = styled.div`
    .ant-row {
        display: flex;
        flex-flow: row wrap;
    }
    .ant-list-item {
        background: #fff;
        padding: 8px!important;
        margin-bottom: 24px;
    }
`;

interface CatalogListProps {
    readonly catalogs: Catalog[];
}

export class CatalogList extends React.PureComponent<CatalogListProps> {
    public render() {
        const { catalogs } = this.props;

        return (
            <CatalogListWrapper>
                <List
                    grid={{
                        gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 6,
                    }}
                    className=""
                    dataSource={catalogs}
                    renderItem={(catalog: Catalog) => {
                        return (
                            <List.Item key={catalog.id}>
                                <CatalogListItem catalog={catalog} />
                            </List.Item>
                        );
                    }}
                />
            </CatalogListWrapper>
        );
    }
}
