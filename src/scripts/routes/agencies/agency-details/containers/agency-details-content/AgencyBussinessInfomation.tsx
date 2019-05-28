import { DescriptionList } from 'ant-design-pro';
import * as React from 'react';

import {
    BusinessInfomationFormButton
} from '@/forms/profile/business-infomation';
import { text } from '@/i18n';
import { User } from '@/restful';

interface AgencyBussinessInfomationProps {
    readonly user: User;
}

export class AgencyBussinessInfomation extends React.PureComponent<AgencyBussinessInfomationProps> {
    public render() {
        const { user } = this.props;
        return (
            <DescriptionList
                title={(
                    <div>
                        Thông tin kinh doanh
                        &nbsp;
                        <BusinessInfomationFormButton
                            formTitle="Điều chỉnh thông tin kinh doanh"
                            type="default"
                            initialValues={user}
                        >
                            Điều chỉnh
                        </BusinessInfomationFormButton>
                    </div>
                )}
                col={1}
            >
                <DescriptionList.Description term={text('Business areas')}>
                    {user.registration_businessAreas || '...'}
                </DescriptionList.Description>
                <DescriptionList.Description term={text('Company name')}>
                    {user.registration_companyName || '...'}
                </DescriptionList.Description>
                <DescriptionList.Description term={text('Company address')}>
                    {user.registration_companyAddress || '...'}
                </DescriptionList.Description>
            </DescriptionList>
        );
    }
}
