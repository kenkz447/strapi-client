import map from 'lodash/map';
import * as React from 'react';
import styled from 'styled-components';

import { RootContext } from '@/app';
import { DomainContext } from '@/domain';

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
    public render() {
        const {
            selectedProduct,
            selectedFurnitureComponentGroup
        } = this.context;

        if (!selectedProduct) {
            return null;
        }

        const modules = selectedProduct.modules.find(o => !!o.component.componentGroup);
        const componentGroup = modules && modules.component.componentGroup;
        const groupLink = componentGroup &&
            `${API_ENTRY}/admin/plugins/content-manager/componentgroup/${componentGroup.id}?source=content-manager`;

        return (
            <ProductLinksWrapper className="product-details-links">
                <ul>
                    {
                        groupLink &&
                        <li key={groupLink}>
                            <a href={groupLink}>
                                {componentGroup!.name}
                            </a>
                            <br/>
                            <small>Component Group</small>
                        </li>

                    }
                </ul>
            </ProductLinksWrapper>
        );
    }
}
