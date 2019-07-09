import { Button, Col, Modal, Row, Typography } from 'antd';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import { RootContext } from 'qoobee';
import * as React from 'react';
import { WithContextProps } from 'react-context-service';
import styled from 'styled-components';

import { getProductDetails, getProductUrl } from '@/business/product';
import { fetchProductModules } from '@/business/product-modules';
import { Img } from '@/components';
import { getMobileUrl } from '@/configs';
import { DomainContext } from '@/domain';
import { text } from '@/i18n';
import { Catalog, ProductExtended } from '@/restful';
import {
    ProductAddToCartSimple
} from '@/routes/product/containers/product-fetcher';
import { formatCurrency } from '@/utilities';

import { CatalogDetailCarouel } from './catalog-detail';

const CatalogDetailWrapper = styled.div`
    .catalog-detail-thumbnail {
        img {
            max-width: 100%;
        }
    }

    .catalog-detail-slide {
        border: 1px solid lightgray;
    }

    .catalog-new-label {
        background: #FBD472;
        padding: 8px 16px;
        display: inline-block;
        color: #000;
        margin-bottom: 24px;
    }

    .catalog-design {
        color: rgba(5, 48, 100, 0.6);
        margin-bottom: 10px;
    }

    .catalog-name {
        font-size: 16px;
        color: rgba(0, 0, 0, 0.6);
        margin-bottom: 40px;
    }

    .catalog-price {
        color: rgba(5, 48, 100, 0.6);
        font-size: 18px;
        margin-bottom: 12px;
    }

    .catalog-details-group {
        margin-bottom: 16px;
        &-header {
            color: rgba(5, 48, 100, 0.6);
            line-height: 2;
            font-size: 16px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.6);
            margin-bottom: 16px;
        }

    }

    .catalog-customize {
        text-align: center;
        &-link {
            margin-bottom: 6px;
            width: 100%;
        }
        &-description {
            text-align: left;
            background: rgba(0, 0, 0, 0.1);
            padding: 24px;
            color: rgba(0, 0, 0, 0.6);
            line-height: 1.5;
        }
    }

    .ant-carousel {
        margin: 0 -6px;
        .slick-slide {
            text-align: center;
            overflow: hidden;
            padding: 6px;
            img {
                max-width: 100%;
            }
        }
    }
`;

interface CatalogDetailProps {
    readonly catalog: Catalog;
}

interface CatalogDetailState {
    readonly product?: ProductExtended;
}

export class CatalogDetail extends React.PureComponent<CatalogDetailProps, CatalogDetailState> {
    public static readonly contextType = RootContext;
    public readonly context!: WithContextProps<DomainContext>;

    constructor(props: CatalogDetailProps) {
        super(props);
        this.state = {

        };

        this.fetchResources();
    }

    private readonly fetchResources = async () => {
        const { catalog } = this.props;
        const modules = await fetchProductModules(catalog.moduleCodes);

        this.setState({
            product: {
                modulesCode: catalog.moduleCodes,
                modules: modules,
                design: catalog.design,
                productType: catalog.productType,
                totalPrice: 0
            }
        });
    }

    private readonly renderProductDetails = () => {
        const { product } = this.state;
        if (!product) {
            return null;
        }

        const productDetails = getProductDetails(product);
        const detailByGroups = groupBy(productDetails, 'group');
        return (
            <div className="catalog-details">
                {
                    map(detailByGroups, (details, key) => {
                        return (
                            <div key={key} className="catalog-details-group">
                                <div className="catalog-details-group-header">
                                    {text(key)}
                                </div>
                                <div
                                    className="catalog-details-group-values"
                                >
                                    {details.map((detail, index) => {
                                        return (
                                            <div
                                                key={index}
                                            >
                                                {detail.label}: {detail.value}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }

    public render() {
        const { history } = this.context;
        const { catalog } = this.props;

        const { product } = this.state;
        const productUrl = product && getProductUrl(product);

        return (
            <CatalogDetailWrapper>
                <Typography.Paragraph strong={true}>
                    {catalog.productTypeGroup.name} - {catalog.design.title || catalog.design.name}
                </Typography.Paragraph>
                <div className="white-space" />
                <Row gutter={48}>
                    <Col lg={10}>
                        <div className="catalog-detail-thumbnail">
                            <Img file={catalog.thumbnail} />
                        </div>
                        <CatalogDetailCarouel photos={catalog.photos} />
                    </Col>
                    <Col lg={14}>
                        {
                            catalog.isNewProduct && (
                                <div className="catalog-new-label">{text('New')}</div>
                            )
                        }
                        <div className="catalog-design">
                            {catalog.design.title || catalog.design.name}
                        </div>
                        <div className="catalog-name">
                            {catalog.name}
                        </div>
                        <div className="catalog-price">
                            {formatCurrency({
                                amount: catalog.recommendedPrice,
                                rate: 1,
                                sourceCurrency: 'VNĐ'
                            })}
                        </div>
                        {
                            product && (
                                <ProductAddToCartSimple
                                    loadedProduct={product}
                                    modulesCode={catalog.moduleCodes}
                                />
                            )
                        }
                        <Typography.Paragraph>
                            {catalog.description}
                        </Typography.Paragraph>
                        {this.renderProductDetails()}
                        <div className="catalog-customize">
                            {
                                productUrl && (
                                    <Button
                                        className="catalog-customize-link"
                                        type="primary"
                                        size="large"
                                        onClick={() => {
                                            const productMobileUrl = getMobileUrl(productUrl);
                                            history.push(productMobileUrl);
                                        }}
                                    >
                                        Tùy biến sản phẩm
                                    </Button>
                                )
                            }
                            <div className="catalog-customize-description">
                                - Sản phẩm có thể tùy biến chất liệu hoàn thiện cho toàn bộ sản phẩm.<br />
                                - Có thể tùy chỉnh thiết kế một số cấu kiện theo mong muốn dựa trên
                                  dữ liệu thiết kế sẵn có.<br />
                                - Có thể áp dụng vật liệu do khách hàng cung cấp.<br />
                                - Có thể yêu cầu vật liệu theo đơn hàng cụ thể.
                            </div>
                        </div>
                    </Col>
                </Row>
            </CatalogDetailWrapper>
        );
    }
}
