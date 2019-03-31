import { OptionProps } from 'antd/lib/select';
import { Formik } from 'formik';
import { RootContext } from 'qoobee';
import * as React from 'react';

import { getDiscountByQuantityLabel } from '@/business/discount-by-quantity';
import { FormikControlBase, FormikControlBaseProps } from '@/components';
import { DomainContext } from '@/domain';
import {
    discountByQuantitiesResources,
    DiscountByQuantity,
    ProductExtended,
    request
} from '@/restful';

import {
    OrderDetailCreateForm,
    OrderDetailCreateFormValues
} from './order-detail-create-form-control';

interface OrderDetailCreateFormControlProps extends FormikControlBaseProps<OrderDetailCreateFormValues> {
    readonly initialValues?: OrderDetailCreateFormValues;
    readonly product: ProductExtended;
    readonly submitDisabled: boolean;
}

interface OrderDetailCreateFormControlState {
    readonly loaded: boolean;
    readonly allQuantityOptions: OptionProps[];
    readonly allQuantity: DiscountByQuantity[];
}

export class OrderDetailCreateFormControl extends FormikControlBase<
    OrderDetailCreateFormValues,
    OrderDetailCreateFormControlProps,
    OrderDetailCreateFormControlState> {
    static readonly contextType = RootContext;
    readonly context!: DomainContext;

    constructor(props: OrderDetailCreateFormControlProps) {
        super(props);

        this.state = {
            loaded: false,
            allQuantityOptions: [],
            allQuantity: []
        };
    }

    private readonly fetchResources = async () => {
        const { product } = this.props;
        if (!product) {
            return;
        }

        const [allQuantity] = await Promise.all([
            request(
                discountByQuantitiesResources.find,
                {
                    type: 'query',
                    parameter: 'productType',
                    value: product.productType.id
                }
            )
        ]);

        this.setState({
            loaded: true,
            allQuantity: allQuantity,
            allQuantityOptions: this.listToOptions(
                allQuantity.map(o => ({ id: o.quantity, name: getDiscountByQuantityLabel(o, product) }))
            )
        });
    }

    readonly beforeSubmit = async (values: OrderDetailCreateFormValues): Promise<OrderDetailCreateFormValues> => {
        const { takeProduct3DScreenshot } = this.context;
        if (!takeProduct3DScreenshot) {
            return values;
        }

        const previewImg = await takeProduct3DScreenshot();

        return {
            ...values,
            previewImg: previewImg
        };
    }

    public componentDidMount() {
        this.fetchResources();
    }

    public render() {
        const { product, submitDisabled } = this.props;
        if (!product) {
            return null;
        }

        const { initialValues } = this.props;
        const { allQuantityOptions, allQuantity } = this.state;

        return (
            <Formik
                ref={this.formInstance}
                initialValues={initialValues!}
                onSubmit={this.onSubmit}
            >
                {(formProps) => (
                    <OrderDetailCreateForm
                        {...formProps}
                        submitDisabled={submitDisabled}
                        allQuantity={allQuantity}
                        quantitySelectOptions={allQuantityOptions}
                        product={product}
                    />
                )}
            </Formik>
        );
    }
}