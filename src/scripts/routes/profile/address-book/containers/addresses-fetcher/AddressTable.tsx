import { DescriptionList } from 'ant-design-pro';
import { Avatar, Button, List } from 'antd';
import * as React from 'react';
import styled from 'styled-components';

import { BusinessController } from '@/business';
import { deleteAddress } from '@/business/address';
import { NoContent } from '@/components';
import { AddressFormButton } from '@/forms/profile/address/AddressFormButton';
import { text } from '@/i18n';
import { Address } from '@/restful';

const AddressTableWrapper = styled.div`
    margin: 0 0 24px 0;
`;

export interface AddressTableProps {
    readonly onDelete: () => void;
    readonly addresses: Address[];
    readonly loading: boolean;
}

interface AddressTableState {
}

export class AddressTable extends React.PureComponent<AddressTableProps, AddressTableState> {
    constructor(props: AddressTableProps) {
        super(props);
    }

    public render() {
        const { addresses } = this.props;

        if (!addresses.length) {
            return (<NoContent />);
        }

        return (
            <AddressTableWrapper>
                <List
                    dataSource={addresses}
                    renderItem={(address: Address, index: number) => {
                        return (
                            <List.Item
                                key={address.id}
                                actions={[
                                    <AddressFormButton
                                        key="update"
                                        label={text('Update address infomation')}
                                        initialValues={address}
                                        icon="edit"
                                    />,
                                    <BusinessController
                                        key="edit"
                                        action={deleteAddress}
                                        needsConfirm={true}
                                    >
                                        {({ doBusiness, loading }) => (
                                            <Button
                                                icon="delete"
                                                type="danger"
                                                loading={loading}
                                                onClick={() => doBusiness(address)}
                                            />
                                        )}
                                    </BusinessController>

                                ]}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar>#{index + 1}</Avatar>}
                                    title={address.fullAddress}
                                    description={(
                                        <DescriptionList
                                            title={text('Consignee name') + ': ' + address.consigneeName}
                                            col={2}
                                        >
                                            <DescriptionList.Description term={text('Email')}>
                                                {address.email || '...'}
                                            </DescriptionList.Description>
                                            <DescriptionList.Description term={text('Phone')}>
                                                {address.phone || '...'}
                                            </DescriptionList.Description>
                                            <DescriptionList.Description term={text('City')}>
                                                {address.city.name}
                                            </DescriptionList.Description>
                                            <DescriptionList.Description term={text('County')}>
                                                {address.county.name}
                                            </DescriptionList.Description>
                                        </DescriptionList>
                                    )}
                                />
                            </List.Item>
                        );
                    }}
                />
            </AddressTableWrapper >
        );
    }
}
