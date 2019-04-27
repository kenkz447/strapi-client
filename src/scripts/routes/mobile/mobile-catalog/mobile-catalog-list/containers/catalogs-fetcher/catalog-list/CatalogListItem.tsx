import { Typography } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Img } from '@/components';
import { getMobileUrl, MOBILE_CATALOG_DETAILS_URL } from '@/configs';
import { Catalog } from '@/restful';
import { formatCurrency, replaceRoutePath } from '@/utilities';

export const CatalogListItemWrapper = styled.div`
    margin-bottom: 24px;
    .catalog-item-thumbnail {
        margin-bottom: 8px;
        position: relative;

        img {
            max-width: 100%;
        }
        &:hover {
           > [class*="-overlay"] {
                opacity: 1;
            }
        }
    }

    .catalog-item-name {
        margin-bottom: 15px;
    }

    .catalog-item-info {
        &-design {
            margin-bottom: 5px;
            color: rgba(5, 48, 100, 0.6);
        }
        &-price {
            color: rgba(5, 48, 100, 0.6);
        }
    }
`;

interface CatalogListItemProps {
    readonly catalog: Catalog;
}

export class CatalogListItem extends React.PureComponent<CatalogListItemProps> {
    private readonly getDetailUrl = () => {
        const { catalog } = this.props;

        return replaceRoutePath(
            getMobileUrl(MOBILE_CATALOG_DETAILS_URL),
            {
                id: catalog.id
            }
        );
    }

    public render() {
        const { catalog } = this.props;

        return (
            <CatalogListItemWrapper>
                <Link
                    className="catalog-item-thumbnail-overlay-btn"
                    to={this.getDetailUrl()}
                >
                    <div className="catalog-item-thumbnail">
                        <Img file={catalog.thumbnail} />
                    </div>
                    <div className="text-center">
                        <div className="catalog-item-name">
                            <Typography.Text>{catalog.name}</Typography.Text>
                        </div>
                        <div className="catalog-item-info">
                            <Typography.Paragraph className="catalog-item-info-design">
                                {catalog.design.name}
                            </Typography.Paragraph>
                            <Typography.Paragraph className="catalog-item-info-price">
                                {formatCurrency({
                                    amount: catalog.recommendedPrice,
                                    rate: 1,
                                    sourceCurrency: 'VNĐ'
                                })}
                            </Typography.Paragraph>
                        </div>
                    </div>
                </Link>
            </CatalogListItemWrapper >
        );
    }
}
