import 'ant-design-pro/lib/DescriptionList/style/css';

import DescriptionList from 'ant-design-pro/lib/DescriptionList';
import { Badge, Button, Col, Row, Table, Tag } from 'antd';
import { BadgeProps } from 'antd/lib/badge';
import * as React from 'react';
import { RestfulRender } from 'react-restful';
import styled from 'styled-components';

import { BusinessController } from '@/business';
import { rejectBusinessLiscense } from '@/business/business-license';
import { getUploadedFileSrc } from '@/business/uploaded-file';
import { AgencyFormButton } from '@/forms/agency/agency-create';
import { text } from '@/i18n';
import { Agency, businessLicenseResources, User } from '@/restful';

const { Description } = DescriptionList;

export interface AccountExpandedRowProps {
    readonly user: User;
    readonly onAccepted: () => void;
}

export class AccountExpandedRow extends React.PureComponent<AccountExpandedRowProps> {
    public render() {
        const { user, onAccepted } = this.props;
        const { license } = user;

        if (!license) {
            return <p>Không có thông tin đăng ký</p>;
        }

        return (
            <Row>
                <Col span={12}>
                    {
                        !license.isBusiness
                            ? (
                                <p>{text('This customer does not provide business information')}</p>
                            )
                            : (
                                <RestfulRender
                                    resource={businessLicenseResources.findOne}
                                    parameters={{
                                        type: 'path',
                                        parameter: 'id',
                                        value: license.id || license['_id']
                                    }}
                                >
                                    {({ data }) => {
                                        let statusColor = 'blue';
                                        if (license.status === 'rejected') {
                                            statusColor = 'red';
                                        } else if (license.status === 'accepted') {
                                            statusColor = 'green';
                                        }

                                        return (
                                            <DescriptionList
                                                size="large"
                                                title={text('Registration infomation')}
                                                col={1}
                                            >
                                                <Description term={text('Status')}>
                                                    <Tag color={statusColor}>{text(license.status)}</Tag>
                                                </Description>
                                                <Description term={text('Company')}>
                                                    <b>{license.companyName}</b>
                                                </Description>
                                                <Description term={text('Business area')}>
                                                    <b>{license.businessAreas}</b>
                                                </Description>
                                                <Description term={text('Business license')}>
                                                    <a
                                                        href={getUploadedFileSrc({
                                                            uploadedFile: data
                                                                ? data.businessLicense
                                                                : license.businessLicense
                                                        })}
                                                        target="_blank"
                                                    >
                                                        {text('Vew the license')}
                                                    </a>
                                                </Description>
                                            </DescriptionList>
                                        );
                                    }}
                                </RestfulRender>
                            )
                    }
                </Col>
                <Col span={12} className="text-right">
                    {
                        (license.status === 'pending') && (
                            <React.Fragment>
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
                                <BusinessController
                                    action={rejectBusinessLiscense}
                                    confirmTitle={text('Reject this user?')}
                                    needsConfirm={true}
                                >
                                    {({ doBusiness }) => (
                                        <Button
                                            type="danger"
                                            ghost={true}
                                            onClick={() => doBusiness(user.license)}

                                        >
                                            {text('Reject')}
                                        </Button>
                                    )}
                                </BusinessController>
                            </React.Fragment>
                        )
                    }
                </Col>
            </Row>
        );
    }
}
