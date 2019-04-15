import { Card, Tabs } from 'antd';
import * as React from 'react';

import { CATALOG_URL } from '@/configs';
import { ProductType } from '@/restful';

export interface CatalogFetcherProps {
    readonly productTypes: ProductType[];
    readonly activeTab?: string;
}

export class CatalogFetcher extends React.PureComponent<CatalogFetcherProps> {
    private readonly onTabClick = (tabKey: CatalogFetcherProps['activeTab']) => {
        const { history } = this.context;

        history.replace(`${CATALOG_URL}/${tabKey}`);
    }

    public render() {
        const { activeTab, productTypes } = this.props;

        return (
            <Card
                bordered={true}
                title={(
                    <Tabs
                        size="large"
                        activeKey={activeTab}
                        defaultActiveKey="posts"
                        onTabClick={this.onTabClick}
                    >
                        {
                            productTypes.map(o => {
                                return (
                                    <Tabs.TabPane tab={o.name} key={o.id} />
                                );
                            })
                        }
                    </Tabs>
                )}
            >
                {}
            </Card>
        );
    }
}
