import { Col, Icon, Row, Select } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { verticalLayout } from '@/components';
import { PROFILE_ADDRESS_BOOK_URL } from '@/configs';
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
                <Col {...verticalLayout.labelCol}/>
                <Col {...verticalLayout.wrapperCol}>
                    <Select
                        style={{ marginBottom: 6 }}
                        placeholder={text('Select from address book')}
                        onSelect={this.onAddressBookSelect}
                    >
                        {addressOptions.map(o => (
                            <Select.Option key={o.value} value={o.value}>
                                {o.title}
                            </Select.Option>
                        ))}
                    </Select>
                    <Link to={PROFILE_ADDRESS_BOOK_URL}>
                        <Icon type="link" /> Xem sổ địa chỉ
                    </Link>
                </Col>
            </Row>
        );
    }
}