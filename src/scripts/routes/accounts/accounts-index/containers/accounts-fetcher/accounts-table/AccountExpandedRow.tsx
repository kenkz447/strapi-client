import 'ant-design-pro/lib/DescriptionList/style/css';

import DescriptionList from 'ant-design-pro/lib/DescriptionList';
import { Col, Icon, Row } from 'antd';
import * as React from 'react';

import { AgencyFormButton } from '@/forms/agency/agency-create';
import { text } from '@/i18n';
import {
    Agency,
    agencyResources,
    BusinessLicense,
    request,
    User
} from '@/restful';

interface AccountExpandedRowProps {
    readonly user: User;
    readonly onAccepted: () => void;
}

interface AccountExpandedRowState {
    readonly loading?: boolean;
    readonly license?: BusinessLicense;
    readonly isNoLicense?: boolean;
    readonly agency?: Agency | null;
}

export class AccountExpandedRow extends React.PureComponent<
    AccountExpandedRowProps,
    AccountExpandedRowState
    > {

    constructor(props: AccountExpandedRowProps) {
        super(props);
        this.state = {
            loading: true
        };
        this.fetchResources();
    }

    private readonly fetchResources = async () => {
        const { user } = this.props;
        try {
            const agency = await request(
                agencyResources.findOneByUser,
                {
                    type: 'path',
                    parameter: 'userId',
                    value: user.id || user._id
                }
            );
            this.setState({
                agency: agency.id ? agency : null,
                loading: false
            });
        } catch (error) {
            this.setState({
                loading: false
            });
        }
    }

    public render() {
        const { onAccepted, user } = this.props;
        const { license, loading, agency } = this.state;

        if (loading) {
            return <Icon type="loading" spin={true} />;
        }

        return (
            <Row>
                <Col span={12}>
                    <DescriptionList title="Thông tin đăng ký" col={1}>
                        <DescriptionList.Description term={text('Business areas')}>
                            {user.registration_businessAreas || '...'}
                        </DescriptionList.Description>
                        <DescriptionList.Description term={text('Company name')}>
                            {user.registration_companyName || '...'}
                        </DescriptionList.Description>
                        <DescriptionList.Description term={text('Company address')}>
                            {user.registration_companyAddress || '...'}
                        </DescriptionList.Description>
                        <DescriptionList.Description term={text('Source')}>
                            {user.reflink ? user.reflink.name : '...'}
                        </DescriptionList.Description>
                    </DescriptionList>
                </Col>
                <Col span={12} className="text-right">
                    {!user.confirmed && (
                        <span>Người dùng chưa xác thực email</span>
                    )}
                    {
                        (user.confirmed && !agency) && (
                            <AgencyFormButton
                                initialValues={{
                                    linkedUser: user,
                                    email: user.email,
                                    address: user.registration_companyAddress,
                                    name: user.registration_companyName,
                                    phone: user.phone
                                }}
                                label={text('Confirm')}
                                type="primary"
                                ghost={true}
                                onSuccess={onAccepted}
                            />
                        )
                    }
                </Col>
            </Row>
        );
    }
}
