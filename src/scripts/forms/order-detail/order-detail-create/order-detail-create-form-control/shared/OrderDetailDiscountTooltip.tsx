import { Icon, Tooltip } from 'antd';
import * as React from 'react';

import { text } from '@/i18n';
import { formatCurrency } from '@/utilities';

const metaStyle = {
    width: 130,
    display: 'inline-block'
};

interface OrderDetailDiscountTooltipProps {
    readonly discountByAgencyPolicy?: number;
    readonly discountByQuantity?: number;
}

export class OrderDetailDiscountTooltip extends React.PureComponent<OrderDetailDiscountTooltipProps> {
    public render() {
        const { discountByAgencyPolicy, discountByQuantity } = this.props;
        return (
            <Tooltip
                placement="right"
                title={(
                    <div className="product-form-discount-info">
                        <div className="product-form-discount-info-agency">
                            <span style={metaStyle}>{text('By agency policy')}:</span> {formatCurrency(discountByAgencyPolicy)}
                        </div>
                        <div className="product-form-discount-info-quantity">
                            <span style={metaStyle}>{text('By quantity')}:</span> {formatCurrency(discountByQuantity)}
                        </div>
                    </div>
                )}
            >
                <Icon type="question-circle" theme="twoTone" />
            </Tooltip>
        );
    }
}