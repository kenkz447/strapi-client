import { Form, Select, Tabs } from 'antd';
import { UnregisterCallback } from 'history';
import { RootContext } from 'qoobee';
import * as React from 'react';
import styled from 'styled-components';

import { WithHistory } from '@/domain';
import { text } from '@/i18n';
import { ProductDesign, ProductType, ProductTypeGroup } from '@/restful';

const MobileProductTypeSelectWrapper = styled.div`
    margin-bottom: 24px;
    
    .ant-form-item {
        margin: 0 24px 12px 24px;
    }
    .ant-form-item-label label {
        color: var(--primary-color);
    }
`;

export interface MobileProductTypeSelectProps {
    readonly allProductTypeGroups: ProductTypeGroup[];
    readonly allProductType: ProductType[];
    readonly allProductDesign: ProductDesign[];
}

export interface MobileProductTypeSelectState {
    readonly productTypeGroup: string | null;
    readonly productType: string | null;
    readonly productDesign: string | null;
}

export class MobileProductTypeSelect extends React.PureComponent<
    MobileProductTypeSelectProps,
    MobileProductTypeSelectState
    > {
    static readonly contextType = RootContext;
    readonly context!: WithHistory;
    readonly unlistenHistory: UnregisterCallback;
    _isUnmounting!: boolean;

    constructor(props: MobileProductTypeSelectProps, context: WithHistory) {
        super(props);
        this.state = MobileProductTypeSelect.getSearchParamsState();

        const { history } = context;
        this.unlistenHistory = history.listen(this.onLocationChange);
    }

    static readonly getSearchParamsState = (): MobileProductTypeSelectState => {
        const searchParams = new URLSearchParams(location.search);

        const productTypeGroup = searchParams.get('productTypeGroup');
        const productType = searchParams.get('productType');
        const productDesign = searchParams.get('productDesign');

        return {
            productTypeGroup,
            productType,
            productDesign
        };
    }

    private readonly onLocationChange = () => {
        if (this._isUnmounting) {
            return;
        }
        const nextState = MobileProductTypeSelect.getSearchParamsState();
        this.setState(nextState);
    }

    private readonly onProductTypeGroupChange = (nextProductTypeGroupId: string) => {
        const searchParams = new URLSearchParams(location.search);

        searchParams.set('productTypeGroup', nextProductTypeGroupId);
        searchParams.delete('productType');
        searchParams.delete('productDesign');

        const { history } = this.context;

        history.replace('?' + searchParams.toString());
    }

    private readonly onProductTypeChange = (nextProductTypeId: string) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('productType', nextProductTypeId);
        searchParams.delete('productDesign');
        const { history } = this.context;

        history.replace('?' + searchParams.toString());
    }

    private readonly onProductDesignChange = (nextProductDesignId: string) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('productDesign', nextProductDesignId);
        const { history } = this.context;

        history.replace('?' + searchParams.toString());
    }

    private readonly trySetDefaultState = () => {
        const { allProductDesign, allProductType, allProductTypeGroups } = this.props;
        const { productDesign, productType, productTypeGroup } = MobileProductTypeSelect.getSearchParamsState();

        if (productDesign && productType && productTypeGroup) {
            return;
        }

        const searchParams = new URLSearchParams(location.search);

        if (!productTypeGroup && allProductTypeGroups.length) {
            searchParams.set('productTypeGroup', allProductTypeGroups[0].id);
        }

        if (!productType && allProductType.length) {
            const currentProductTypeGroup = searchParams.get('productTypeGroup');
            if (!currentProductTypeGroup) {
                return;
            }

            const defaultProductType = allProductType.find(o => {
                if (!o.productTypeGroup) {
                    return false;
                }

                if (typeof o.productTypeGroup === 'string') {
                    return o.productTypeGroup === currentProductTypeGroup;
                }

                return o.productTypeGroup.id === currentProductTypeGroup;
            });

            if (!defaultProductType) {
                return;
            }
            searchParams.set('productType', defaultProductType.id);
        }

        if (!productDesign && allProductType.length) {
            const currentProductType = searchParams.get('productType');
            if (!currentProductType) {
                return;
            }

            const defaultProductDesign = allProductDesign.find(o => {
                if (!o.productType || typeof o.productType === 'string') {
                    return o.productType === currentProductType;
                }
                return o.productType.id === currentProductType;
            });

            if (!defaultProductDesign) {
                return;
            }

            searchParams.set('productDesign', defaultProductDesign.id);
        }

        const { history } = this.context;
        history.replace('?' + searchParams.toString());
    }

    private readonly getProductTypeByCurrentGroup = () => {
        const { allProductType } = this.props;
        const { productTypeGroup } = this.state;

        return allProductType.filter(o => {
            if (!o.productTypeGroup) {
                return false;
            }

            if (typeof o.productTypeGroup === 'string') {
                return o.productTypeGroup === productTypeGroup;
            }

            return o.productTypeGroup.id === productTypeGroup;
        });
    }

    private readonly getProductDesignByCurrentType = () => {
        const { allProductDesign } = this.props;
        const { productType } = this.state;

        if (!productType) {
            return [];
        }

        return allProductDesign.filter(o => {
            if (!o.productType) {
                return false;
            }

            if (typeof o.productType === 'string') {
                return o.productType === productType;
            }

            return o.productType.id === productType;
        });
    }

    public componentDidUpdate() {
        this.trySetDefaultState();
    }

    public componentWillUnmount() {
        this._isUnmounting = true;
        this.unlistenHistory();
    }

    public render() {
        const {
            allProductTypeGroups
        } = this.props;

        const { productType, productDesign, productTypeGroup } = this.state;

        const filteredProductTypes = this.getProductTypeByCurrentGroup();
        const filteredProductDesigns = this.getProductDesignByCurrentType();

        return (
            <MobileProductTypeSelectWrapper className="mobile-product-type-select">
                <Tabs
                    activeKey={productTypeGroup || undefined}
                    onChange={this.onProductTypeGroupChange}
                >
                    {allProductTypeGroups
                        .map(o => (
                            <Tabs.TabPane key={o.id} tab={o.name} />
                        ))
                    }
                </Tabs>
                {
                    filteredProductTypes.length > 1 && (
                        <Form.Item label={text('Type')}>
                            <Select
                                value={productType || undefined}
                                onChange={this.onProductTypeChange}
                                className="w-100"
                                placeholder={text('Select')}
                                size="large"
                            >
                                {filteredProductTypes.map(o => (
                                    <Select.Option key={o.id} value={o.id}>{o.name}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    )
                }
                {
                    filteredProductDesigns.length > 1 && (
                        <Form.Item label={text('Design')}>
                            <Select
                                value={productDesign || undefined}
                                onChange={this.onProductDesignChange}
                                className="w-100"
                                placeholder={text('Select')}
                                size="large"
                            >
                                {filteredProductDesigns.map(o => (
                                    <Select.Option key={o.id} value={o.id}>{o.name}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    )
                }
            </MobileProductTypeSelectWrapper>
        );
    }
}
