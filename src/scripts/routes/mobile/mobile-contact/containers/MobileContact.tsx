import { Card, Divider, Typography } from 'antd';
import * as React from 'react';
import styled from 'styled-components';

import { text } from '@/i18n';
import { ProductTypeGroup } from '@/restful';
import {
    ContactGoogleMap
} from '@/routes/catalog/catalog-list/containers/catalog-contact';

const MobileContactWrapper = styled.div`
    overflow: overlay;
    ::-webkit-scrollbar {
        display: none;
    }
`;

interface MobileContactProps {
    readonly productTypeGroups: ProductTypeGroup[];
}

export class MobileContact extends React.PureComponent<MobileContactProps> {

    private readonly pickRandomProductTypeGroup = () => {
        const { productTypeGroups } = this.props;
        return productTypeGroups[Math.floor(Math.random() * productTypeGroups.length)];
    }

    public render() {
        const typeGroup = this.pickRandomProductTypeGroup();
        if (!typeGroup) {
            return null;
        }

        return (
            <MobileContactWrapper>
                <Card bordered={false} style={{ overflow: 'overlay' }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <img src="/static/assets/sofa.jpg" />
                    </div>
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
                        {text('Địa chỉ nhà máy sản xuất')}
                    </Typography.Paragraph>
                    <Typography.Paragraph type="secondary">
                        25/6a Nhị Bình 02, xã Nhị Bình huyện Hóc Môn, tp Hồ Chí Minh.
                        Vui lòng gọi để đặt lịch hẹn trước khi đến : 0933550609
                </Typography.Paragraph>
                    <ContactGoogleMap />
                    <Divider />
                    <Typography.Paragraph strong={true}>
                        {text('Thông tin liên hệ')}
                    </Typography.Paragraph>
                    <Typography.Paragraph type="secondary">
                        Đặt hàng dự án: Mr Việt 0902902574 <br />
                        Liên hệ làm đại lý: Mr Jay 0984442264 <br />
                        Tư vấn thông tin sản phẩm: Ms Ngọc 0902902458 <br />
                        Email: info@mfurniture.vn
                </Typography.Paragraph>
                    <Divider />
                    <Typography.Paragraph strong={true}>
                        {text('Hotline chăm sóc khách hàng')}
                    </Typography.Paragraph>
                    <Typography.Paragraph type="secondary">
                        Vui lòng gọi: 0902902574 <br />
                        Email : info@mfurniture.vn
                </Typography.Paragraph>
                </Card>
            </MobileContactWrapper>
        );
    }
}
