import { Button, Tooltip } from 'antd';
import * as React from 'react';
import styled from 'styled-components';

import { COLOR_PRIMARY_200 } from '@/configs';
import { formatCurrency } from '@/utilities';

const ProductPriceWrapper = styled.div`
margin-top: 14px;
    padding: 10px 15px;
    border-radius: 50px;
    background: ${COLOR_PRIMARY_200};
    width: 256px;
    display: flex;
    .product-price-value {
        font-size: 18px;
        line-height: 40px;
    }
`;

export interface ProductPriceProps {
    readonly totalPrice: number;
    readonly actionIcon: string;
    readonly actionCallback: () => void;
    readonly actionTitle: string;
}

export class ProductPrice extends React.PureComponent<ProductPriceProps> {
    public render() {
        const {
            totalPrice,
            actionCallback,
            actionIcon,
            actionTitle
        } = this.props;

        return (
            <ProductPriceWrapper>
                <div className="flex-grow-1">
                    <strong className="product-price-value">
                        {formatCurrency(totalPrice)}
                    </strong>
                </div>
                <Tooltip title={actionTitle}>
                    <Button
                        onClick={actionCallback}
                        icon={actionIcon}
                        shape="circle-outline"
                        size="large"
                    />
                </Tooltip>

            </ProductPriceWrapper>
        );
    }
}
