import map from 'lodash/map';
import * as React from 'react';
import styled from 'styled-components';

import { RootContext } from '@/app';
import { DomainContext } from '@/domain';
import { FurnitureComponentGroup } from '@/restful';

const ProductLinksWrapper = styled.div`
    margin-top: 15px;
    padding: 15px 0 0 0;
    border: 1px solid lightgray;
`;

interface ProductLinksProps {
}

export class ProductLinks extends React.PureComponent<ProductLinksProps> {
    static readonly contextType = RootContext;
    readonly context!: DomainContext;

    private readonly getComponentLinks = () => {
        const {
            selectedProduct
        } = this.context;

        return selectedProduct!.modules.map(o => ({
            url: `${API_ENTRY}/admin/plugins/content-manager/components/${o.component.id}?source=content-manager`,
            label: o.component.name
        }));
    }

    public render() {
        const {
            selectedProduct
        } = this.context;

        if (!selectedProduct) {
            return null;
        }

        const modules = selectedProduct.modules.find(o => !!o.component.componentGroup);
        const componentGroup = modules && modules.component.componentGroup as FurnitureComponentGroup;
        const groupUrl = componentGroup &&
            `${API_ENTRY}/admin/plugins/content-manager/componentgroup/${componentGroup.id}?source=content-manager`;

        const designId = selectedProduct.design.id;

        const designUrl =
            `${API_ENTRY}/admin/plugins/content-manager/design/${designId}?source=content-manager`;

        const getComponentLinks = this.getComponentLinks();

        return (
            <ProductLinksWrapper className="product-details-links">
                <ul>
                    <li>
                        <a href={designUrl}>
                            {selectedProduct.design!.name}
                        </a>
                        <br />
                        <small>Design</small>
                    </li>
                    {
                        groupUrl &&
                        <li key={groupUrl}>
                            <a href={groupUrl}>
                                {componentGroup!.name}
                            </a>
                            <br />
                            <small>Component Group</small>
                        </li>
                    }
                    {
                        getComponentLinks.map(o => {
                            return (
                                <li key={o.url}>
                                    <a href={o.url}>
                                        {o.label}
                                    </a>
                                    <br />
                                    <small>Component</small>
                                </li>
                            );
                        })
                    }
                </ul>
            </ProductLinksWrapper>
        );
    }
}
