import { Avatar, List } from 'antd';
import * as React from 'react';
import styled from 'styled-components';

import { NoContent } from '@/components';
import { StoredPromoCode } from '@/restful';

const StoredPromoCodeTableWrapper = styled.div`
    margin: 0 0 24px 0;
`;

export interface StoredPromoCodeTableProps {
    readonly onDelete: () => void;
    readonly storedPromoCodes: StoredPromoCode[];
    readonly loading: boolean;
}

interface StoredPromoCodeTableState {
}

export class StoredPromoCodeTable extends React.PureComponent<StoredPromoCodeTableProps, StoredPromoCodeTableState> {
    constructor(props: StoredPromoCodeTableProps) {
        super(props);
    }

    public render() {
        const { storedPromoCodes } = this.props;

        if (!storedPromoCodes.length) {
            return (<NoContent />);
        }

        return (
            <StoredPromoCodeTableWrapper>
                <List
                    dataSource={storedPromoCodes}
                    renderItem={(storedPromoCode: StoredPromoCode, index: number) => {
                        return (
                            <List.Item key={storedPromoCode.id}>
                                <List.Item.Meta
                                    avatar={<Avatar>#{index + 1}</Avatar>}
                                    title={storedPromoCode.promoCode}
                                    description={storedPromoCode.promotion.description}
                                />
                            </List.Item>
                        );
                    }}
                />
            </StoredPromoCodeTableWrapper >
        );
    }
}
