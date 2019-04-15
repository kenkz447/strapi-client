import 'ant-design-pro/lib/DescriptionList/style/css';

import DescriptionList from 'ant-design-pro/lib/DescriptionList';
import { Col, Icon, Row } from 'antd';
import * as React from 'react';

import { AgencyFormButton } from '@/forms/agency/agency-create';
import { text } from '@/i18n';
import { BusinessLicense, User } from '@/restful';

interface AccountExpandedRowProps {
    readonly user: User;
    readonly onAccepted: () => void;
}

interface AccountExpandedRowState {
    readonly loading?: boolean;
    readonly license?: BusinessLicense;
    readonly isNoLicense?: boolean;
}

export class AccountExpandedRow extends React.PureComponent<
    AccountExpandedRowProps,
    AccountExpandedRowState
    > {

    constructor(props: AccountExpandedRowProps) {
        super(props);
        this.state = {
            loading: false
        };
        this.fetchResources();
    }

    private readonly fetchResources = async () => {
        // 
    }

    public render() {
        const { onAccepted, user } = this.props;
        const { license, loading } = this.state;

        if (loading) {
            return <Icon type="loading" spin={true} />;
        }

        return (
            <Row>
                <Col span={12}>
                    <p>{text('This customer does not provide business information')}</p>
                </Col>
                <Col span={12} className="text-right">
                    <AgencyFormButton
                        initialValues={{
                            linkedUser: user,
                            businessLicense: license
                        }}
                        label={text('Confirm')}
                        type="primary"
                        ghost={true}
                        onSuccess={onAccepted}
                    />
                </Col>
            </Row>
        );
    }
}
