import { Col, Row } from 'antd';
import { SelectValue } from 'antd/lib/select';
import * as React from 'react';
import styled from 'styled-components';
import { string } from 'yup';

import { FormInput, FormSelect } from '@/components';
import { text } from '@/i18n';

import { RouteAgenciesContext } from '../../RouteAgenciesContext';

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

export interface AgencyFilterProps {
    readonly name: string | null;
    readonly onNameChange: (name: string | null) => void;
    readonly level: string | null;
    readonly onLevelChange: (level: string | null) => void;
}

export interface AgencyFilterState {
    readonly name: string | null;
}

export class AgencyFilter extends React.PureComponent<
    AgencyFilterProps,
    AgencyFilterState
    > {
    constructor(props: AgencyFilterProps) {
        super(props);

        this.state = {
            name: this.props.name
        };
    }

    private readonly onNameChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        this.setState({
            name: e.target.value
        });
    }

    public componentDidUpdate(prevProps: AgencyFilterProps, prevState: AgencyFilterState) {
        const { name: currentName } = this.state;
        if (prevState.name === currentName) {
            return;
        }

        const { onNameChange } = this.props;
        onNameChange(currentName);
    }

    render() {
        const { level, onLevelChange } = this.props;
        return (
            <TableFilterWrapper>
                <Row gutter={24}>
                    <Col span={6}>
                        <FormInput
                            value={this.state.name || undefined}
                            label={text('Name')}
                            placeholder={text('input name...')}
                            onChange={this.onNameChange}
                        />
                    </Col>
                    <Col span={6}>
                        <RouteAgenciesContext.Consumer>
                            {({ agencyLevels }) => {
                                const selectOptions = agencyLevels.map(
                                    o => ({ value: o.id, title: text(o.name) }));

                                return (
                                    <FormSelect
                                        value={level || undefined}
                                        label={text('Role')}
                                        placeholder={text('select role')}
                                        options={selectOptions}
                                        allowClear={true}
                                        onChange={onLevelChange as (value: SelectValue) => void}
                                    />
                                );
                            }}
                        </RouteAgenciesContext.Consumer>
                    </Col>
                </Row>
            </TableFilterWrapper>
        );
    }
}