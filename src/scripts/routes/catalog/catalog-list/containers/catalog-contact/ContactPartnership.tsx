import { Col, Row } from 'antd';
import { RootContext } from 'qoobee';
import * as React from 'react';
import { WithContextProps } from 'react-context-service';
import { Router } from 'react-router';
import styled from 'styled-components';

import { DomainContext } from '@/domain';
import {
    RegisterFormContainer
} from '@/routes/auth/register/containers/RegisterFormContainer';

const ContactPartnershipWrapper = styled.div`
    background: #08979C;
    color: #000;
    padding: 12px;
    border-radius: 4px;

    a {
        color: #fff;
    }
`;

const ContactPartnershipContent = styled.div`
    .partnership-header {
        margin-left: 37px;
        margin-bottom: 12px;
        letter-spacing: 3px;
    }

    .partnership-detail {
        display: flex;
        margin-bottom: 24px;
        &-index {
            border-radius: 50%;
            border: 1px solid #000;
            height: 25px;
            width: 25px;
            margin-right: 12px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    > p, > ul {
        margin-left: 37px;
    }
    p, li {
        margin-bottom: 6px;
        color: #000;
        text-align: justify;
    }
    h3 {
        font-weight: bold;
    }
`;

interface ContactPartnershipProps {
}

export class ContactPartnership extends React.PureComponent<ContactPartnershipProps> {
    public static readonly contextType = RootContext;
    public readonly context!: WithContextProps<DomainContext>;

    private readonly onDetailsClick = () => {
        const { setContext } = this.context;

        setContext({
            globalModalVisibled: true,
            globalModal: {
                width: 1100,
                className: 'modal-no-footer',
                bodyStyle: {
                    padding: 48
                },
                children: this.renderModalContent()
            }
        });
    }

    private readonly renderModalContent = () => {
        const { history } = this.context;

        return (
            <Row gutter={80}>
                <Col span={12}>
                    <ContactPartnershipContent>
                        <p style={{ paddingBottom: 24 }}>
                            Với mong muốn đưa nội thất Việt cất cánh cao hơn không chỉ ở thị trường xuất khẩu mà còn tiếp cận sâu, trực tiếp hơn đến nhu cầu của người tiêu dùng thị trường nội địa, [M]furniture trân trọng kính mời các cá nhân, đơn vị cùng hợp tác trong việc triển khai và phân phối các sản phẩm nội thất của công ty.
                        <br />
                            Khi hợp tác với [M]furniture, Quý doanh nghiệp và đối tác sẽ có cơ hội được kinh doanh sản phẩm nội thất uy tín, chất lượng tốt. [M]furniture cam kết đem lại giá trị, lợi ích tốt nhất cho tất cả các đối tác và khách hàng.
                        </p>
                        <h3 className="partnership-header">QUYỀN LỢI ĐỐI TÁC</h3>
                        <div>
                            {/* tslint:disable-next-line:max-line-length */}
                            {this.renderPartnershipDetail(1, 'Mức chiết khấu ưu đãi', 'Tất cả các thành viên tham gia vào chương trình đối tác của [M]furniture đều được chiết khấu với nhiều mức ưu đãi hấp dẫn khác nhau cho từng đối tác')}
                            {/* tslint:disable-next-line:max-line-length */}
                            {this.renderPartnershipDetail(2, 'Tùy biến sản phẩm dễ dàng', 'Tùy biến thiết kế sản phẩm dễ dàng, linh hoạt với tool thiết kế của riêng [M]furniture, thiết kế sản phẩm furniture cho riêng mình giờ dễ dàng hơn bao giờ hết.')}
                            {/* tslint:disable-next-line:max-line-length */}
                            {this.renderPartnershipDetail(3, 'Chương trình ưu đãi', 'Tham gia các chương trình ưu đãi khi mua hàng: giảm giá khi mua số lượng lớn, mua sản phẩm mẫu trưng bày với giá cực tốt.')}
                            {/* tslint:disable-next-line:max-line-length */}
                            {this.renderPartnershipDetail(4, 'Tool thiết kế riêng dành cho thương hiệu của đối tác', 'Tư vấn và hỗ trợ hoàn thiện quy trình kinh doanh theo hình thức đại lý với thương hiệu riêng dựa trên nền tảng website của [M]furniture')}
                            {/* tslint:disable-next-line:max-line-length */}
                            {this.renderPartnershipDetail(5, 'Chương trình đào tạo thường xuyên', 'Được tư vấn và đào tạo các kỹ năng sử dụng tool miễn phí để giới thiệu nội thất đến khách hàng và update các tính năng mới thường xuyên')}
                        </div>
                        <h3 className="partnership-header">ĐỐI  TƯỢNG  HỢP  TÁC</h3>
                        <ul>
                            <li>Công ty thiết kế, thi công</li>
                            <li>Chủ đầu tư</li>
                            <li>Freelancer</li>
                            <li>Các doanh nghiệp hoạt động trong lĩnh vực kinh doanh thương mại</li>
                            <li>Mọi đối tượng yêu thích kinh doanh và có khả năng phân phối các sản phẩm nội thất</li>
                        </ul>
                        <h3 className="partnership-header">ĐIỀU  KIỆN  HỢP  TÁC</h3>
                        <ul>
                            <li>Đối tác doanh nghiệp: là tổ chức đang kinh doanh và hoạt động theo pháp luật</li>
                            {/* tslint:disable-next-line:max-line-length */}
                            <li>Đối tác cá nhân: có kinh nghiệm, có kiến thức và uy tín trong việc cung cấp, giới thiệu các sản phẩm nội thất</li>
                        </ul>
                    </ContactPartnershipContent>
                </Col>
                <Col span={12}>
                    <Router history={history}>
                        <RegisterFormContainer
                            reflink={null!}
                        />
                    </Router>
                </Col>
            </Row>
        );
    }

    private readonly renderPartnershipDetail = (index: number, title: string, description: string) => {
        return (
            <div className="partnership-detail">
                <div>
                    <div className="partnership-detail-index">
                        <span className="">{index}</span>
                    </div>
                </div>
                <div className="partnership-detail-content">
                    <p>
                        <strong>{title}</strong>
                    </p>
                    <p>{description}</p>
                </div>
            </div>
        );
    }

    public render() {
        return (
            <ContactPartnershipWrapper className="catalog-contact-partnership">
                <div>CHƯƠNG TRÌNH DÀNH RIÊNG CHO ĐỐI TÁC CỦA <strong>[M]furniture</strong></div>
                <div>Dành cho đối tượng là nhà thiết kế, sản xuất, kinh doanh furniture...</div>
                <a onClick={this.onDetailsClick}>Click để biết thêm chi tiết</a>
            </ContactPartnershipWrapper>
        );
    }
}
