import { Typography } from 'antd';
import { RootContext } from 'qoobee';
import * as React from 'react';
import { WithContextProps } from 'react-context-service';
import { RestfulRender } from 'react-restful';

import { BusinessController } from '@/business';
import { updateBusinessInfo } from '@/business/profile';
import {
    isUserNeedsUpdateBusinessInfo,
    isUserWaitingForVerify
} from '@/business/user';
import { Loading } from '@/components';
import { DomainContext } from '@/domain';
import { showMessage } from '@/effects';
import {
    BusinessInfomationFormControl
} from '@/forms/profile/business-infomation';
import { agencyLevelResources, User } from '@/restful';

import { DashboardAgencyLevelList } from './dashboard-agencylevels-fetcher';

interface DashboardAgencyLevelsFetcherProps {
}

export class DashboardAgencyLevelsFetcher extends React.PureComponent<DashboardAgencyLevelsFetcherProps> {
    public static readonly contextType = RootContext;
    public readonly context!: WithContextProps<DomainContext>;

    public render() {
        const { currentUser } = this.context;

        const needsUpdateBusinessInfo = isUserNeedsUpdateBusinessInfo(currentUser);
        const waitingForVerify = isUserWaitingForVerify(currentUser);

        if (needsUpdateBusinessInfo) {
            return (
                <div>
                    <BusinessController
                        action={updateBusinessInfo}
                        onSuccess={(updatedUser: User) => {
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
                </div>
            );
        }

        if (waitingForVerify) {
            return (
                <Typography.Paragraph>
                    Thông tin của bạn đã được gởi đi, vui lòng chờ chúng tôi xác minh dữ liệu mà quí khách đã cung cấp!
                </Typography.Paragraph>
            );
        }

        return (
            <RestfulRender
                resource={agencyLevelResources.find}
                render={(renderProps) => {
                    const { data } = renderProps;

                    if (!data) {
                        return <Loading />;
                    }

                    return (
                        <DashboardAgencyLevelList
                            agencyLevels={data}
                        />
                    );
                }}
            />
        );
    }
}
