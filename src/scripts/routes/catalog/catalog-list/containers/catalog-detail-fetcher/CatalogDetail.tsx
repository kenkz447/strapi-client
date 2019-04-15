import { Carousel, Col, Row, Typography } from 'antd';
import * as React from 'react';
import styled from 'styled-components';

import { Img } from '@/components';
import { Catalog } from '@/restful';

const CatalogDetailWrapper = styled.div`
    .catalog-detail-thumbnail {
        img {
            max-width: 100%;
        }
    }

    .catalog-detail-slide {
        border: 1px solid lightgray;
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

export class CatalogDetail extends React.PureComponent<CatalogDetailProps> {
    public render() {
        const { catalog } = this.props;
        return (
            <CatalogDetailWrapper>
                <Typography.Paragraph strong={true}>
                    {catalog.productTypeGroup.name} - {catalog.design.displayName || catalog.design.name}
                </Typography.Paragraph>
                <div className="white-space" />
                <Row gutter={24}>
                    <Col span={10}>
                        <div className="catalog-detail-thumbnail">
                            <Img file={catalog.thumbnail} />
                        </div>
                        <Carousel
                            slidesToShow={4}
                            dots={false}
                            infinite={false}
                        >
                            {
                                catalog.photos.map(photo => {
                                    return (
                                        <div key={photo.id} className="catalog-detail-slide">
                                            <Img file={photo} className="mw-100" />
                                        </div>
                                    );
                                })
                            }
                        </Carousel>
                    </Col>
                    <Col span={14}>
                    </Col>
                </Row>
            </CatalogDetailWrapper>
        );
    }
}
