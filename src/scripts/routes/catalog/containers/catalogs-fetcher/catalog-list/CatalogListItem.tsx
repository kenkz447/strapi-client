import { Typography } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Img } from '@/components';
import { Catalog } from '@/restful';
import { formatCurrency } from '@/utilities';

export const CatalogListItemWrapper = styled.div`
    margin-bottom: 24px;
    
    .catalog-item-thumbnail {
        border: 1px solid rgba(0, 0, 0, 0.05);
        margin-bottom: 8px;
        position: relative;
        &-overlay {
            opacity: 0;
            background-color: rgba(0,0,0,.5);
            height: 100%;
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            transition: all .3s;
            display: flex;
            justify-content: center;
            align-items: center;
            &-btn {
                display: inline-block;
                border: 1px solid  #fff;
                border-radius: 50px;
                padding: 8px 16px;
                color: #fff;
            }
        }

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
    public render() {
        const { catalog } = this.props;
        return (
            <CatalogListItemWrapper>
                <div className="catalog-item-thumbnail">
                    <Img file={catalog.thumbnail} />
                    <div className="catalog-item-thumbnail-overlay">
                        <Link className="catalog-item-thumbnail-overlay-btn" to="">Xem chi tiết</Link>
                    </div>
                </div>
                <div className="text-center">
                    <div className="catalog-item-name">
                        <Typography.Text>{catalog.name}</Typography.Text>
                    </div>
                    <div className="catalog-item-info">
                        <Typography.Paragraph className="catalog-item-info-design">
                            {catalog.design.name}
                        </Typography.Paragraph>
                        <Typography.Text className="catalog-item-info-price">
                            {formatCurrency({
                                amount: catalog.recommendedPrice,
                                rate: 1,
                                sourceCurrency: 'VNĐ'
                            })}
                        </Typography.Text>
                    </div>
                </div>
            </CatalogListItemWrapper>
        );
    }
}
