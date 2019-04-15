import { List } from 'antd';
import * as React from 'react';

import { Catalog } from '@/restful';

import { CatalogListItem } from './catalog-list';

interface CatalogListProps {
    readonly catalogs: Catalog[];
}

export class CatalogList extends React.PureComponent<CatalogListProps> {
    public render() {
        const { catalogs } = this.props;

        return (
            <List
                grid={{
                    gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 6,
                }}
                dataSource={catalogs}
                renderItem={(catalog: Catalog) => {
                    return (
                        <List.Item key={catalog.id}>
                            <CatalogListItem catalog={catalog}  />
                        </List.Item>
                    );
                }}
            />
        );
    }
}
