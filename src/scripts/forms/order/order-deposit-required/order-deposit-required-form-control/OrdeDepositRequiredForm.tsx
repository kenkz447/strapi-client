import { FormikProps } from 'formik';
import * as React from 'react';

import {
    FormBody,
    FormDatePicker,
    FormInputMoney,
    verticalLayout
} from '@/components';
import { text } from '@/i18n';
import { Order } from '@/restful';

export type OrderDepositRequiredFormValues = Partial<Order>;

export interface OrderDepositRequiredFormOwnProps extends FormikProps<OrderDepositRequiredFormValues> {
}

export function OrderDepositRequiredForm(props: OrderDepositRequiredFormOwnProps) {
    const {
        values,
        errors,
        setFieldValue
    } = props;

    return (
        <FormBody formProps={props}>
            <FormInputMoney
                name={nameof<OrderDepositRequiredFormValues>(o => o.depositRequired)}
                value={values.depositRequired}
                setFieldValue={setFieldValue}
                required={true}
                wrapperCol={verticalLayout.wrapperCol}
                labelCol={verticalLayout.labelCol}
                help={errors.depositRequired}
                validateStatus={errors.depositRequired ? 'error' : undefined}
                label={text('Deposit amount')}
                placeholder={text('Input money')}
                className="w-100"
            />
        </FormBody>
    );
}