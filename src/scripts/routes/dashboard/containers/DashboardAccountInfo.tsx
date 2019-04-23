import { Pie } from 'ant-design-pro/lib/Charts';
import { Card, Icon, Typography } from 'antd';
import { User } from 'firebase';
import { RootContext } from 'qoobee';
import * as React from 'react';
import { WithContextProps } from 'react-context-service';
import styled from 'styled-components';

import { BusinessController } from '@/business';
import { updateBusinessInfo } from '@/business/profile';
import { getUserFirstName } from '@/business/user';
import { DomainContext } from '@/domain';
import { showMessage } from '@/effects';
import {
    BusinessInfomationFormControl
} from '@/forms/profile/business-infomation';
import { text } from '@/i18n';

import { DashboardProfileOverview } from './dashboard-account-info';

const DashboardAccountInfoHeadline = styled.h4`
    text-decoration: none;
    font-size: 20px;
    color: #333740;
    letter-spacing: 0;
    transition: color .2s ease;
    border-bottom: 3px solid #f0b41e;
    display: inline-block;
`;

interface DashboardAccountInfoProps {
}

export class DashboardAccountInfo extends React.PureComponent<DashboardAccountInfoProps> {
    public static readonly contextType = RootContext;
    public readonly context!: WithContextProps<DomainContext>;

    private readonly needsUpdateBusinessInfo = () => {
        const { currentUser } = this.context;
        if (currentUser.role.name! === 'Registered') {
            return !currentUser.registration_businessAreas
                || !currentUser.registration_companyName
                || !currentUser.registration_companyAddress;
        }

        return false;
    }

    private readonly waitingForVerify = () => {
        const { currentUser } = this.context;

        return !!currentUser.registration_businessAreas
            && !!currentUser.registration_companyName
            && !!currentUser.registration_companyAddress;
    }

    public render() {
        const { currentUser } = this.context;

        const needsUpdateBusinessInfo = this.needsUpdateBusinessInfo();
        const waitingForVerify = !needsUpdateBusinessInfo && this.waitingForVerify();

        return (
            <Card className="mh-100" bordered={false}>
                <div>
                    <div>
                        <DashboardAccountInfoHeadline>
                            {text('Welcome')} {getUserFirstName(currentUser)}!
                        </DashboardAccountInfoHeadline>
                        <p className="text-justify">
                            {
                                needsUpdateBusinessInfo
                                    // tslint:disable-next-line:max-line-length
                                    ? text('Tài khoản của bạn chưa đủ điều kiện để sử dụng đầy đủ chức năng của [M]Furniture, vui lòng cung cấp thông thin theo mẫu phía dưới để chúng tôi có thể biết bạn là ai.')
                                    : waitingForVerify
                                        // tslint:disable-next-line:max-line-length
                                        ? text('Thông tin của bạn đã được gởi đi, vui lòng chờ chúng tôi xác minh dữ liệu mà quí khách đã cung cấp!')
                                        : text('DashboardWelcome')
                            }
                        </p>
                        <div className="white-space-2" />
                        {
                            (needsUpdateBusinessInfo || waitingForVerify)
                                ? (
                                    <BusinessController
                                        action={updateBusinessInfo}
                                        onSuccess={(updatedUser: User) => {
                                            showMessage({
                                                content: 'Done',
                                                type: 'success'
                                            });
                                            this.context.setContext({
                                                // tslint:disable-next-line:no-any
                                                currentUser: updatedUser as any
                                            });
                                        }}
                                    >
                                        {({ doBusiness }) => (
                                            <BusinessInfomationFormControl
                                                initialValues={currentUser}
                                                submit={doBusiness}
                                                readOnly={waitingForVerify}
                                            />
                                        )}
                                    </BusinessController>
                                )
                                : < DashboardProfileOverview />
                        }
                    </div>
                </div>
            </Card>
        );
    }
}
