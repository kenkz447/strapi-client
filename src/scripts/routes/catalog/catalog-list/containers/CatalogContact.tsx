import { Card, Divider, Typography } from 'antd';
import { RootContext } from 'qoobee';
import * as React from 'react';
import styled from 'styled-components';

import { DomainContext } from '@/domain';
import { text } from '@/i18n';
import { ProductTypeGroup } from '@/restful';

import {
    ContactGoogleMap,
    ContactPartnership,
    ContactProductGroupIcons
} from './catalog-contact';

const CatalogContactWrapper = styled.div`
    padding: 24px 0 0 24px;
    overflow: auto;
    overflow: overlay;
    ::-webkit-scrollbar {
        display: none;
    }

    .catalog-contact-headline {
        text-decoration: none;
        font-size: 18px;
        font-weight: bold;
        color: rgba(0, 0, 0, 0.6);
        letter-spacing: 0;
        transition: color .2s ease;
        border-bottom: 3px solid #f0b41e;
        display: inline-block;
    }
`;

interface CatalogContactProps {
    readonly productTypeGroups: ProductTypeGroup[];
    readonly selectedProductTypeGroup?: string;
}

export class CatalogContact extends React.PureComponent<CatalogContactProps> {

    public static readonly contextType = RootContext;
    public readonly context!: DomainContext;

    private readonly pickRandomProductTypeGroup = () => {
        const { productTypeGroups, selectedProductTypeGroup } = this.props;
        if (selectedProductTypeGroup) {
            return productTypeGroups.find(o => o.id === selectedProductTypeGroup);
        }

        return productTypeGroups[0];
    }

    public render() {
        const typeGroup = this.pickRandomProductTypeGroup();
        const { currentUser } = this.context;

        if (!typeGroup) {
            return null;
        }

        return (
            <CatalogContactWrapper>
                <Card bordered={false} style={{ overflow: 'overlay' }}>
                    <div className="catalog-contact-headline">
                        {typeGroup.name}
                    </div>
                    <ContactProductGroupIcons icons={typeGroup.icons} />
                    {
                        !currentUser && (
                            <React.Fragment>

                                <Divider />
                                <ContactPartnership />
                            </React.Fragment>
                        )
                    }
                    <Divider />
                    <Typography.Paragraph strong={true}>
                        {text('Thời gian làm việc')}
                    </Typography.Paragraph>
                    <Typography.Paragraph type="secondary">
                        Thứ 2 đến thứ 6 hàng tuần <br />
                        - Từ 8am đến 5pm <br />
                        Support online từ thứ 2 đến thứ 7 <br />
                        - Từ 8am đến 5pm
                </Typography.Paragraph>
                    <Divider />
                    <Typography.Paragraph strong={true}>
                        {text('Factory address')}
                    </Typography.Paragraph>
                    <Typography.Paragraph type="secondary">
                        Nhị Bình 02, xã Nhị Bình huyện Hóc Môn, tp Hồ Chí Minh.
                        Vui lòng gọi để đặt lịch hẹn trước khi đến : 0909.909.347
                </Typography.Paragraph>
                    <ContactGoogleMap />
                    <Divider />
                    <Typography.Paragraph strong={true}>
                        {text('Thông tin liên hệ')}
                    </Typography.Paragraph>
                    <Typography.Paragraph type="secondary">
                        Đặt hàng dự án: Mr Việt 0902902574 <br />
                        Liên hệ làm đại lý: Mr Jay 0984442264 <br />
                        Tư vấn thông tin sản phẩm: Ms Ngọc 0902902458
                </Typography.Paragraph>
                    <Divider />
                    <Typography.Paragraph strong={true}>
                        {text('Hotline chăm sóc khách hàng')}
                    </Typography.Paragraph>
                    <Typography.Paragraph type="secondary">
                        Vui lòng gọi: 0909.909.347 <br />
                        Email : info@mfurniture.vn
                </Typography.Paragraph>
                </Card>
            </CatalogContactWrapper>
        );
    }
}
