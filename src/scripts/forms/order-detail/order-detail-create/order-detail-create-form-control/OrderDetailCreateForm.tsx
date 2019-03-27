import { OptionProps } from 'antd/lib/select';
import { FormikProps } from 'formik';
import * as React from 'react';

import { getDiscountByQuantityValue } from '@/business/discount-by-quantity';
import { getProductOriginPrice } from '@/business/product';
import {
    FormBody,
    FormInputMoney,
    FormSelect,
    verticalLayout
} from '@/components';
import { text } from '@/i18n';
import { DiscountByQuantity, OrderDetail, ProductExtended } from '@/restful';

export type OrderDetailCreateFormValues = Partial<OrderDetail>;

export interface OrderDetailCreateFormOwnProps extends FormikProps<OrderDetailCreateFormValues> {
    readonly allQuantity: DiscountByQuantity[];
    readonly quantitySelectOptions: OptionProps[];
    readonly product: ProductExtended;
}

export class OrderDetailCreateForm extends React.PureComponent<OrderDetailCreateFormOwnProps> {
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
            quantitySelectOptions
        } = this.props;

        return (
            <FormBody formProps={this.props}>
                <FormSelect
                    name={nameof<OrderDetailCreateFormValues>(o => o.quantity)}
                    value={values.quantity}
                    setFieldValue={setFieldValue}
                    options={quantitySelectOptions}
                    wrapperCol={verticalLayout.wrapperCol}
                    labelCol={verticalLayout.labelCol}
                    help={errors.quantity}
                    validateStatus={errors.quantity ? 'error' : undefined}
                    label={text('Quantity')}
                    placeholder={text('Select quantity')}
                />
                <FormInputMoney
                    name={nameof<OrderDetailCreateFormValues>(o => o.discount)}
                    value={values.discount}
                    wrapperCol={verticalLayout.wrapperCol}
                    labelCol={verticalLayout.labelCol}
                    label={text('Total discount')}
                    placeholder={text('...')}
                    readOnly={true}
                    className="w-100"
                />
                <FormInputMoney
                    name={nameof<OrderDetailCreateFormValues>(o => o.totalPrice)}
                    value={values.totalPrice}
                    wrapperCol={verticalLayout.wrapperCol}
                    labelCol={verticalLayout.labelCol}
                    label={text('Total of payment')}
                    placeholder={text('...')}
                    readOnly={true}
                    className="w-100"
                />
            </FormBody>
        );
    }
}