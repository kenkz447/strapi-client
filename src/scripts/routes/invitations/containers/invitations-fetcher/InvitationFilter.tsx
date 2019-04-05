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

export interface InvitationFilterProps {
    readonly name: string | null;
    readonly onNameChange: (name: string | null) => void;
    readonly role: string | null;
    readonly onRoleChange: (role: string) => void;
}

export interface InvitationFilterState {
    readonly name: string | null;
}

export class InvitationFilter extends React.PureComponent<
    InvitationFilterProps,
    InvitationFilterState
    > {
    constructor(props: InvitationFilterProps) {
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

    componentDidUpdate(prevProps: InvitationFilterProps, prevState: InvitationFilterState) {
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