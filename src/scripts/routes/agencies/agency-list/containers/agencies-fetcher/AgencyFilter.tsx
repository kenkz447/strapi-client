import { Col, Row } from 'antd';
import * as React from 'react';
import styled from 'styled-components';

import { FormInput } from '@/components';
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

export interface AgencyFilterProps {
    readonly name: string | null;
    readonly onNameChange: (name: string | null) => void;
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

    readonly onNameChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        this.setState({
            name: e.target.value
        });
    }

    componentDidUpdate(prevProps: AgencyFilterProps, prevState: AgencyFilterState) {
        const { name: currentName } = this.state;
        if (prevState.name === currentName) {
            return;
        }

        const { onNameChange } = this.props;
        onNameChange(currentName);
    }

    render() {
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
                </Row>
            </TableFilterWrapper>
        );
    }
}