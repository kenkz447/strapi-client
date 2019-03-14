import { FormikProps } from 'formik';
import * as React from 'react';

import { FormBody, FormTextArea } from '@/components';
import { OrderTransaction } from '@/restful';

export type OrderTransactionRejectFormValues = Partial<OrderTransaction>;

export interface OrderTransactionRejectFormOwnProps extends FormikProps<OrderTransactionRejectFormValues> {
}

export function OrderTransactionRejectForm(props: OrderTransactionRejectFormOwnProps) {
    const {
        values,
        handleChange    } = props;

    return (
        <FormBody formProps={props}>
            <FormTextArea
                name={nameof<OrderTransactionRejectFormValues>(o => o.rejectReason)}
                onChange={handleChange}
                value={values.rejectReason}
                placeholder="..."
                label="Lí do từ chối giao dịch này là gì?"
                autoFocus={true}
            />
        </FormBody>
    );
}