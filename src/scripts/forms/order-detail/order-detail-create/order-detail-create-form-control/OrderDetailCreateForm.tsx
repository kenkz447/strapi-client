import { Button, Form } from 'antd';
import { OptionProps } from 'antd/lib/select';
import { FormikProps } from 'formik';
import * as React from 'react';
import styled from 'styled-components';

import { getDiscountByQuantityValue } from '@/business/discount-by-quantity';
import { getProductOriginPrice } from '@/business/product';
import {
    FormBody,
    FormInputNumber,
    verticalLayout,
    verticalLayoutNoLabel
} from '@/components';
import { text } from '@/i18n';
import { DiscountByQuantity, OrderDetail, ProductExtended } from '@/restful';
import { formatCurrency } from '@/utilities';

const OrderDetailCreateFormWrapper = styled.div`
    .ant-form-item {
        margin-bottom: 0;
    }
    .total-price {
        font-size: 16px;
        font-weight: bold;
    }
`;

export type OrderDetailCreateFormValues = Partial<OrderDetail>;

export interface OrderDetailCreateFormOwnProps extends FormikProps<OrderDetailCreateFormValues> {
    readonly allQuantity: DiscountByQuantity[];
    readonly quantitySelectOptions: OptionProps[];
    readonly product: ProductExtended;
    readonly submitDisabled: boolean;
}

interface OrderDetailCreateFormState {
    readonly quantitySelectOptions: OptionProps[];
}

export class OrderDetailCreateForm extends React.PureComponent<
    OrderDetailCreateFormOwnProps,
    OrderDetailCreateFormState
    > {

    constructor(props: OrderDetailCreateFormOwnProps) {
        super(props);

        this.state = {
            quantitySelectOptions: props.quantitySelectOptions
        };
    }

    private readonly onQuantityChange = () => {
        const { values, product, allQuantity, setFieldValue } = this.props;

        const singleDiscount = getDiscountByQuantityValue(allQuantity, values.quantity);
        const totalDiscount = singleDiscount * values.quantity!;

        const productOriginPrice = getProductOriginPrice(product);
        const totalPrice = (productOriginPrice * values.quantity!) - totalDiscount;

        setFieldValue(
            'subTotalPrice',
            productOriginPrice * (values.quantity || 1)
        );

        setFieldValue(
            'totalPrice',
            totalPrice
        );

        setFieldValue(
            'totalDiscountPerProduct',
            singleDiscount
        );

        setFieldValue(
            'discount',
            totalDiscount
        );
    }

    public componentDidUpdate(prevProps: OrderDetailCreateFormOwnProps) {
        if (this.props.values.quantity !== prevProps.values.quantity) {
            this.onQuantityChange();
        }
    }

    public render() {
        const {
            values,
            errors,
            setFieldValue,
            product,
            handleSubmit,
            isSubmitting,
            submitDisabled,
        } = this.props;

        const canSubmit = !submitDisabled && values.quantity && values.quantity > 0;
        const isPromotion = !!values.storedPromoCode;

        return (
            <FormBody formProps={this.props}>
                <OrderDetailCreateFormWrapper>
                    <Form.Item
                        wrapperCol={verticalLayout.wrapperCol}
                        labelCol={verticalLayout.labelCol}
                        label={text('Price')}
                    >
                        {formatCurrency(product!.totalPrice)}
                    </Form.Item>
                    {
                        isPromotion
                            ? (
                                <Form.Item
                                    wrapperCol={verticalLayout.wrapperCol}
                                    labelCol={verticalLayout.labelCol}
                                    label={text('Quantity')}
                                >
                                    {values.quantity} {text('products')}
                                </Form.Item>
                            )
                            : (
                                <FormInputNumber
                                    name={nameof<OrderDetailCreateFormValues>(o => o.quantity)}
                                    value={values.quantity}
                                    setFieldValue={setFieldValue}
                                    wrapperCol={verticalLayout.wrapperCol}
                                    labelCol={verticalLayout.labelCol}
                                    help={errors.quantity}
                                    validateStatus={errors.quantity ? 'error' : undefined}
                                    label={text('Quantity')}
                                    placeholder={text('100')}
                                    max={1000}
                                    min={1}
                                />
                            )
                    }
                    <Form.Item
                        wrapperCol={verticalLayout.wrapperCol}
                        labelCol={verticalLayout.labelCol}
                        label={text('Total discount')}
                    >
                        {formatCurrency(values.discount || 0)}
                    </Form.Item>
                    <Form.Item
                        wrapperCol={verticalLayout.wrapperCol}
                        labelCol={verticalLayout.labelCol}
                        label={text('Total of payment')}
                    >
                        <span className="total-price">
                            {formatCurrency(values.totalPrice || 0)}
                        </span>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={verticalLayoutNoLabel.wrapperCol}
                    >
                        {
                            isPromotion
                                ? (
                                    <Button
                                        type="primary"
                                        onClick={() => handleSubmit()}
                                        disabled={!canSubmit}
                                        loading={isSubmitting}
                                        icon="gift"
                                    >
                                        {text('Receive incentives')}
                                    </Button>
                                )
                                : (
                                    <Button
                                        type="primary"
                                        onClick={() => handleSubmit()}
                                        disabled={!canSubmit}
                                        loading={isSubmitting}
                                    >
                                        {text('Add to cart')}
                                    </Button>
                                )
                        }
                    </Form.Item>
                </OrderDetailCreateFormWrapper>
            </FormBody>
        );
    }
}