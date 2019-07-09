import { Button, Form, Icon, Tooltip, Typography } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { OptionProps } from 'antd/lib/select';
import { FormikProps } from 'formik';
import { RootContext } from 'qoobee';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { getDiscountByQuantityValue } from '@/business/discount-by-quantity';
import { getProductOriginPrice } from '@/business/product';
import {
    FormBody,
    FormInputNumber,
    verticalLayout,
    verticalLayoutNoLabel
} from '@/components';
import { LOGIN_URL } from '@/configs';
import { DomainContext } from '@/domain';
import { text } from '@/i18n';
import { DiscountByQuantity, OrderDetail, ProductExtended } from '@/restful';
import { formatCurrency } from '@/utilities';

import { OrderDetailDiscountTooltip } from './shared';

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
    readonly simpleMode?: boolean;
}

interface OrderDetailCreateFormState {
    readonly quantitySelectOptions: OptionProps[];
}

export class OrderDetailCreateForm extends React.PureComponent<
    OrderDetailCreateFormOwnProps,
    OrderDetailCreateFormState
    > {

    public static readonly contextType = RootContext;
    public readonly context!: DomainContext;

    constructor(props: OrderDetailCreateFormOwnProps) {
        super(props);

        this.state = {
            quantitySelectOptions: props.quantitySelectOptions
        };
    }

    private readonly onQuantityChange = () => {
        const { values, product, setFieldValue, allQuantity } = this.props;

        const productOriginPrice = getProductOriginPrice(product);
        const singleDiscount = getDiscountByQuantityValue(allQuantity, values.quantity, product.totalPrice);

        setFieldValue(
            nameof<OrderDetail>(o => o.subTotalPrice),
            productOriginPrice * (values.quantity || 1)
        );

        setFieldValue(
            nameof<OrderDetail>(o => o.totalDiscountPerProduct),
            singleDiscount
        );
    }

    private readonly getProductDiscount = () => {
        const { values } = this.props;
        const { currentAgency } = this.context;

        const agencyDiscountPercent = currentAgency && currentAgency.level && currentAgency.level.discountPercent;
        const agencyDiscount = agencyDiscountPercent
            ? values.subTotalPrice! * 0.01 * agencyDiscountPercent
            : 0;

        const discountByQuantity = values.totalDiscountPerProduct! * values.quantity!;

        const totalDiscount = discountByQuantity + agencyDiscount;

        return {
            discountByQuantity: discountByQuantity,
            discountByAgencyPolicy: agencyDiscount,
            totalDiscount: totalDiscount
        };
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
            simpleMode
        } = this.props;

        const { currentUser } = this.context;

        const canSubmit = !submitDisabled && values.quantity && values.quantity > 0;
        const isPromotion = !!values.storedPromoCode;

        const { totalDiscount, discountByQuantity, discountByAgencyPolicy } = this.getProductDiscount();
        const totalPrice = values.subTotalPrice! - totalDiscount;

        if (simpleMode) {
            return (
                <FormBody formProps={this.props}>
                    <OrderDetailCreateFormWrapper>
                        <FormItem
                            validateStatus={errors.quantity ? 'error' : undefined}
                            label={text('Quantity to buy')}
                            help={errors.quantity}
                        >
                            <FormInputNumber
                                style={{ marginRight: 6 }}
                                name={nameof<OrderDetailCreateFormValues>(o => o.quantity)}
                                value={values.quantity}
                                setFieldValue={setFieldValue}
                                useFieldWrapper={false}
                                placeholder={text('100')}
                                max={1000}
                                min={1}
                            />
                            <Button
                                type="primary"
                                ghost={true}
                                onClick={() => handleSubmit()}
                                disabled={!currentUser || !canSubmit}
                                loading={isSubmitting}
                            >
                                {text('Add to cart')}
                            </Button>
                        </FormItem>
                        <div>
                            {/* tslint:disable-next-line:max-line-length */}
                            {!currentUser && <i>Vui lòng <Link to={LOGIN_URL + `?returnUrl=${location.href}`}>đăng nhập</Link> để đặt hàng</i>}
                        </div>
                    </OrderDetailCreateFormWrapper>
                </FormBody>
            );
        }

        return (
            <FormBody formProps={this.props}>
                <OrderDetailCreateFormWrapper>
                    <Form.Item
                        wrapperCol={verticalLayout.wrapperCol}
                        labelCol={verticalLayout.labelCol}
                        label={text('Price')}
                    >
                        &nbsp; {formatCurrency(product!.totalPrice)}
                    </Form.Item>
                    {
                        isPromotion
                            ? (
                                <Form.Item
                                    wrapperCol={verticalLayout.wrapperCol}
                                    labelCol={verticalLayout.labelCol}
                                    label={text('Quantity')}
                                >
                                    &nbsp;{values.quantity} {text('products')}
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
                                    label={text('Quantity to buy')}
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
                        &nbsp;-{formatCurrency(totalDiscount || 0)}
                        &nbsp;
                        {
                            totalDiscount > 0 && (
                                <OrderDetailDiscountTooltip
                                    discountByAgencyPolicy={discountByAgencyPolicy}
                                    discountByQuantity={discountByQuantity}
                                />
                            )
                        }
                    </Form.Item>
                    <Form.Item
                        wrapperCol={verticalLayout.wrapperCol}
                        labelCol={verticalLayout.labelCol}
                        label={text('Total of payment')}
                    >
                        <span className="total-price">
                            &nbsp; {formatCurrency(totalPrice)}
                        </span>
                    </Form.Item>

                    {
                        <Form.Item
                            wrapperCol={verticalLayoutNoLabel.wrapperCol}
                            // tslint:disable-next-line:max-line-length
                            help={!currentUser && <i>Vui lòng <Link to={LOGIN_URL + `?returnUrl=${location.href}`}>đăng nhập</Link> để đặt hàng</i>}
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
                                            disabled={!currentUser || !canSubmit}
                                            loading={isSubmitting}
                                        >
                                            {text('Add to cart')}
                                        </Button>
                                    )
                            }
                        </Form.Item>
                    }

                </OrderDetailCreateFormWrapper>
            </FormBody>
        );
    }
}