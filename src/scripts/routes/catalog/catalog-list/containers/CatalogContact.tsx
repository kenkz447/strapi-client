import { Card, Divider, Typography } from 'antd';
import * as React from 'react';

import { text } from '@/i18n';

interface CatalogContactProps {
}

export class CatalogContact extends React.PureComponent<CatalogContactProps> {
    public render() {
        return (
            <Card className="mh-100" bordered={false} style={{ overflow: 'overlay' }}>
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
        );
    }
}
