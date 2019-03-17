import { Col, Row } from 'antd';
import { OptionProps } from 'antd/lib/select';
import { AccessControl } from 'qoobee';
import * as React from 'react';
import styled from 'styled-components';

import { getAllAgency } from '@/business/agency';
import { getAllIssueTicketStatus } from '@/business/issue-ticket';
import { FormInput, FormSelect } from '@/components';
import { functionAllowed } from '@/domain/policies';
import { text } from '@/i18n';

const TableFilterWrapper = styled.div`
    .ant-form-item {
        display: flex;
    }
    .ant-form-item-control-wrapper {
        flex: 1;
    }
    .ant-select {
        width: 100%;
    }
`;

export interface IssueTicketFilterProps {
    readonly code: string | null;
    readonly status: string | null;
    readonly agency: string | null;
    readonly onCodeChange: (code: string | null) => void;
    readonly onStatusChange: (status: string) => void;
    readonly onAgencyChange: (status: string) => void;
}

export interface IssueTicketFilterState {
    readonly code: string | null;
    readonly allAgencyOptions: OptionProps[];
}

export class IssueTicketFilter extends React.PureComponent<
    IssueTicketFilterProps,
    IssueTicketFilterState
    > {
    constructor(props: IssueTicketFilterProps) {
        super(props);

        const allAgency = getAllAgency();

        this.state = {
            code: this.props.code,
            allAgencyOptions: allAgency.map(o => ({ value: o.id, title: o.name }))
        };
    }

    readonly onCodeChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        this.setState({
            code: e.target.value
        });
    }

    componentDidUpdate(prevProps: IssueTicketFilterProps, prevState: IssueTicketFilterState) {
        const { code: currentCode } = this.state;
        if (prevState.code === currentCode) {
            return;
        }

        const { onCodeChange } = this.props;
        onCodeChange(currentCode);
    }

    render() {
        const {
            status,
            agency,
            onStatusChange,
            onAgencyChange
        } = this.props;

        const { allAgencyOptions } = this.state;

        return (
            <TableFilterWrapper>
                <Row gutter={24}>
                    <Col span={6}>
                        <FormInput
                            value={this.state.code || undefined}
                            label={text('Code')}
                            placeholder={text('input code...')}
                            onChange={this.onCodeChange}
                        />
                    </Col>
                    <AccessControl policy={functionAllowed} funcKey="FUNC_ORDERS_FILTER_BY_AGENCY">
                        <Col span={6}>
                            <FormSelect
                                value={agency || undefined}
                                label={text('Agency')}
                                placeholder={text('agency name...')}
                                options={allAgencyOptions}
                                allowClear={true}
                                onChange={onAgencyChange}
                                showSearch={true}
                            />
                        </Col>
                    </AccessControl>
                    <Col span={6}>
                        <FormSelect
                            value={status || undefined}
                            label={text('Status')}
                            placeholder={text('select status')}
                            options={getAllIssueTicketStatus()}
                            allowClear={true}
                            onChange={onStatusChange}
                        />
                    </Col>
                </Row>
            </TableFilterWrapper>
        );
    }
}