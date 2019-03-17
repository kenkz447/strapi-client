import { Table } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { AGENCY_DETAIL_URL, DATE_FORMAT } from '@/configs';
import { text } from '@/i18n';
import { Agency } from '@/restful';
import { formatDate, replaceRoutePath } from '@/utilities';

const AgencyTableWrapper = styled.div`
    margin: 0 0 24px 0;
`;

export interface AgencyTableProps {
    readonly onDelete: () => void;
    readonly agencys: Agency[];
    readonly loading: boolean;
}

interface AgencyTableState {
}

export class AgencyTable extends React.PureComponent<AgencyTableProps, AgencyTableState> {
    constructor(props: AgencyTableProps) {
        super(props);
    }

    public render() {
        const { agencys, loading } = this.props;
        return (
            <AgencyTableWrapper>
                <Table
                    dataSource={agencys}
                    loading={loading}
                    pagination={false}
                    rowKey="id"
                >
                    <Table.Column
                        title={text('Name')}
                        dataIndex={nameof<Agency>(o => o.name)}
                    />
                    <Table.Column
                        title={text('Email')}
                        dataIndex={nameof.full<Agency>(o => o.email)}
                    />
                    <Table.Column
                        title={text('Phone')}
                        dataIndex={nameof.full<Agency>(o => o.phone)}
                    />
                    <Table.Column
                        title={text('Level')}
                        dataIndex={nameof.full<Agency>(o => o.level.name)}
                    />
                    <Table.Column
                        title={text('Created at')}
                        dataIndex={nameof.full<Agency>(o => o.createdAt)}
                        render={(date) => formatDate(date, DATE_FORMAT)}
                    />
                    <Table.Column
                        title=""
                        dataIndex={nameof.full<Agency>(o => o.id)}
                        render={(id: string) => {
                            return (
                                <React.Fragment>
                                    <Link to={replaceRoutePath(AGENCY_DETAIL_URL, { id })}>
                                        {text('Details')}
                                    </Link>
                                </React.Fragment>
                            );
                        }}
                    />
                </Table>
            </AgencyTableWrapper>
        );
    }
}
