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

        &-content {
            p {
                margin-bottom: 6px;
                color: #000;
                text-align: justify;
            }
        }
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
                        <div>
                            <h3 className="partnership-header">QUYỀN LỢI ĐỐI TÁC</h3>
                        </div>
                        <div>
                            {/* tslint:disable-next-line:max-line-length */}
                            {this.renderPartnershipDetail(1, 'Mức chiết khấu ưu đãi', 'Tất cả các thành viên tham gia vào chương trình đối tác của [M]furniture đều được chiết khấu với nhiều mức ưu đãi hấp dẫn khác nhau cho từng đối tác')}
                            {/* tslint:disable-next-line:max-line-length */}
                            {this.renderPartnershipDetail(2, 'Mức chiết khấu ưu đãi', 'Tất cả các thành viên tham gia vào chương trình đối tác của [M]furniture đều được chiết khấu với nhiều mức ưu đãi hấp dẫn khác nhau cho từng đối tác')}
                            {/* tslint:disable-next-line:max-line-length */}
                            {this.renderPartnershipDetail(3, 'Mức chiết khấu ưu đãi', 'Tất cả các thành viên tham gia vào chương trình đối tác của [M]furniture đều được chiết khấu với nhiều mức ưu đãi hấp dẫn khác nhau cho từng đối tác')}
                            {/* tslint:disable-next-line:max-line-length */}
                            {this.renderPartnershipDetail(4, 'Mức chiết khấu ưu đãi', 'Tất cả các thành viên tham gia vào chương trình đối tác của [M]furniture đều được chiết khấu với nhiều mức ưu đãi hấp dẫn khác nhau cho từng đối tác')}
                            {/* tslint:disable-next-line:max-line-length */}
                            {this.renderPartnershipDetail(5, 'Mức chiết khấu ưu đãi', 'Tất cả các thành viên tham gia vào chương trình đối tác của [M]furniture đều được chiết khấu với nhiều mức ưu đãi hấp dẫn khác nhau cho từng đối tác')}

                        </div>
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
