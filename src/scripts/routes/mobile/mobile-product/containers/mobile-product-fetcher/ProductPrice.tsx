import { Button, Tooltip } from 'antd';
import * as React from 'react';
import styled from 'styled-components';

import { COLOR_PRIMARY_200 } from '@/configs';
import { formatCurrency } from '@/utilities';

const ProductPriceWrapper = styled.div`
    margin-top: 14px;
    padding: 10px 15px;
    border-radius: 6px;
    background: ${COLOR_PRIMARY_200};
    width: 256px;
    display: flex;
    .product-price-value {
        font-size: 18px;
        line-height: 40px;
    }
`;

export interface ProductPriceProps {
    readonly className?: string;
    readonly totalPrice: number;
    readonly button: React.ReactNode;
    readonly actionTitle: string;
}

export class ProductPrice extends React.PureComponent<ProductPriceProps> {
    public render() {
        const {
            className,
            totalPrice,
            button,
            actionTitle
        } = this.props;

        return (
            <ProductPriceWrapper className={className}>
                <div className="flex-grow-1">
                    <strong className="product-price-value">
                        {formatCurrency(totalPrice)}
                    </strong>
                </div>
                <Tooltip title={actionTitle}>
                    {button}
                </Tooltip>
            </ProductPriceWrapper>
        );
    }
}
