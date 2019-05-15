import { Typography } from 'antd';
import { RootContext } from 'qoobee';
import * as React from 'react';
import { WithContextProps } from 'react-context-service';
import styled from 'styled-components';

import { DomainContext } from '@/domain';
import { text } from '@/i18n';

const BankTransferInformationModalContexWrapper = styled.div`
    .transfer-infomation-content-meta {
        display: inline-block;
        width: 100px;
    }
`;

interface BankTransferInformationProps {
}

export class BankTransferInformation extends React.PureComponent<BankTransferInformationProps> {
    public static readonly contextType = RootContext;
    public readonly context!: WithContextProps<DomainContext>;

    private readonly onClick = () => {
        this.context.setContext({
            globalModalVisibled: true,
            globalModal: {
                title: text('Transfer information'),
                children: (
                    <BankTransferInformationModalContexWrapper>
                        <div>
                            <Typography.Paragraph strong={true}>Không VAT</Typography.Paragraph>
                            <div>
                                <div>
                                    <div className="transfer-infomation-content-meta">Chủ tài khoản</div>:
                                    LƯƠNG XUÂN HUỲNH
                                </div>
                                <div>
                                    <div className="transfer-infomation-content-meta">Số tài khoản</div>
                                    : 3336437
                                </div>
                                <div>
                                    <div className="transfer-infomation-content-meta">Ngân hàng</div>
                                    : Ngân hàng ACB - PGD Tân Phong
                                </div>
                            </div>
                        </div>
                        <div className="white-space-2" />
                        <div>
                            <Typography.Paragraph strong={true}>Có VAT</Typography.Paragraph>
                            <div>
                                <div>
                                    <div className="transfer-infomation-content-meta">Chủ tài khoản</div>:
                                    CÔNG TY TNHH DB GROUP
                                </div>
                                <div>
                                    <div className="transfer-infomation-content-meta">Số tài khoản</div>
                                    : 238.315.519
                                </div>
                                <div>
                                    <div className="transfer-infomation-content-meta">Ngân hàng</div>
                                    : Ngân hàng ACB - PGD Tân Phong
                                </div>
                            </div>
                        </div>
                    </BankTransferInformationModalContexWrapper>
                )
            }
        });
    }

    public render() {
        return (
            <div>
                <a onClick={this.onClick}>Xem thông tin chuyển khoản</a>
            </div>
        );
    }
}
