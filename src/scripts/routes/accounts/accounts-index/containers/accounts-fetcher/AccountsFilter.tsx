import { Col, Row } from 'antd';
import * as React from 'react';
import styled from 'styled-components';

import { FormInput, FormSelect } from '@/components';
import { text } from '@/i18n';

import { RouteAccountsContext } from '../../RouteAccountsContext';

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

export interface AccountFilterProps {
    readonly name: string | null;
    readonly onNameChange: (name: string | null) => void;
    readonly email: string | null;
    readonly onEmailChange: (name: string | null) => void;
    readonly role: string | null;
    readonly onRoleChange: (role: string) => void;
}

export interface AccountFilterState {
    readonly name: string | null;
    readonly email: string | null;
}

export class AccountFilter extends React.PureComponent<
    AccountFilterProps,
    AccountFilterState
    > {
    constructor(props: AccountFilterProps) {
        super(props);

        this.state = {
            name: this.props.name,
            email: this.props.email
        };
    }

    readonly onNameChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        this.setState({
            name: e.target.value
        });
    }

    readonly onEmailChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        this.setState({
            email: e.target.value
        });
    }

    componentDidUpdate(prevProps: AccountFilterProps, prevState: AccountFilterState) {
        const { name: currentName, email: currentEmail } = this.state;

        const isNameChanged = prevState.name !== currentName;
        const isEmailChanged = prevState.email !== currentEmail;

        if (!isNameChanged && !isEmailChanged) {
            return;
        }

        if (isNameChanged) {
            const { onNameChange } = this.props;
            onNameChange(currentName);
        }

        if (isEmailChanged) {
            const { onEmailChange } = this.props;
            onEmailChange(currentEmail);
        }
    }

    render() {
        const { onRoleChange, role } = this.props;

        return (
            <TableFilterWrapper>
                <Row gutter={24}>
                    <Col span={6}>
                        <FormInput
                            value={this.state.name || undefined}
                            label={text('Name')}
                            placeholder={text('input name')}
                            onChange={this.onNameChange}
                        />
                    </Col>
                    <Col span={6}>
                        <FormInput
                            value={this.state.email || undefined}
                            label={text('Email')}
                            placeholder={text('input email')}
                            onChange={this.onEmailChange}
                        />
                    </Col>
                    <Col span={6}>
                        <RouteAccountsContext.Consumer>
                            {({ roles }) => {
                                const filteredRoles = roles.filter(o => o.name !== 'Public');
                                const selectOptions = filteredRoles.map(
                                    o => ({ value: o.id, title: text('Role_' + o.name) }));

                                return (
                                    <FormSelect
                                        value={role || undefined}
                                        label={text('Role')}
                                        placeholder={text('select role')}
                                        options={selectOptions}
                                        allowClear={true}
                                        onChange={onRoleChange}
                                    />
                                );
                            }}
                        </RouteAccountsContext.Consumer>
                    </Col>
                </Row>
            </TableFilterWrapper>
        );
    }
}