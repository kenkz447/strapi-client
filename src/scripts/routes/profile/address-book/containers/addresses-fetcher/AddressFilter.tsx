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

export interface AddressFilterProps {
    readonly code: string | null;
    readonly onCodeChange: (code: string | null) => void;
}

export interface AddressFilterState {
    readonly code: string | null;
}

export class AddressFilter extends React.PureComponent<
    AddressFilterProps,
    AddressFilterState
    > {
    constructor(props: AddressFilterProps) {
        super(props);

        this.state = {
            code: this.props.code
        };
    }

    readonly onCodeChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        this.setState({
            code: e.target.value
        });
    }

    componentDidUpdate(prevProps: AddressFilterProps, prevState: AddressFilterState) {
        const { code: currentCode } = this.state;
        if (prevState.code === currentCode) {
            return;
        }

        const { onCodeChange } = this.props;
        onCodeChange(currentCode);
    }

    render() {
        return (
            <TableFilterWrapper>
                <Row gutter={24}>
                    <Col span={6}>
                        <FormInput
                            value={this.state.code || undefined}
                            label={text('Code')}
                            placeholder={text('input code')}
                            onChange={this.onCodeChange}
                        />
                    </Col>
                </Row>
            </TableFilterWrapper>
        );
    }
}