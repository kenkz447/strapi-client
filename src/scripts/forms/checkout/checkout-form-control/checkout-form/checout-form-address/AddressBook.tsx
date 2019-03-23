import { Button, Col, Row, Select } from 'antd';
import * as React from 'react';

import { text } from '@/i18n';
import { Address } from '@/restful';

import {
    CheckoutFormContext,
    CheckoutFormContextProps
} from '../../CheckoutFormContext';

export interface AddressBookProps {
    readonly onAddressSelect: (address: Address) => void;
}

export class AddressBook extends React.PureComponent<AddressBookProps> {
    public static readonly contextType = CheckoutFormContext;
    public readonly context!: CheckoutFormContextProps;

    private readonly onAddressBookSelect = (value: string) => {
        const { addresses } = this.context;
        const { onAddressSelect } = this.props;

        const targetAddress = addresses.find(o => o.id === value);
        if (!targetAddress) {
            return;
        }

        onAddressSelect(targetAddress);
    }

    public render() {
        const { addressOptions } = this.context;

        return (
            <Row>
                <Col offset={8} span={16}>
                    <Select
                        placeholder={text('Select from address book')}
                        onSelect={this.onAddressBookSelect}
                    >
                        {addressOptions.map(o => (
                            <Select.Option key={o.value} value={o.value}>
                                {o.title}
                            </Select.Option>
                        ))}
                    </Select>
                </Col>
            </Row>
        );
    }
}