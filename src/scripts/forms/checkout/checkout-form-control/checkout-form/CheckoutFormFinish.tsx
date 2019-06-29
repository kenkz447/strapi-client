import { Button, Checkbox, Divider, Form } from 'antd';
import * as React from 'react';

import { getOrderTotalPayment } from '@/business/order/getters/getOrderPayment';
import {
    FormInput,
    FormTextArea,
    verticalLayout,
    verticalLayoutNoLabel
} from '@/components';
import { text } from '@/i18n';

import { CheckoutFormOwnProps, CheckoutFormValues } from '../CheckoutForm';

interface CheckoutFormFinishProps extends CheckoutFormOwnProps {
    readonly onNextClick: () => void;
    readonly onPrevClick: () => void;
}

interface CheckoutFormFinishState {
    readonly billingEnabled: boolean;
    readonly ortherContactEnaled: boolean;
}

export class CheckoutFormFinish extends React.PureComponent<
    CheckoutFormFinishProps,
    CheckoutFormFinishState
    > {

    constructor(props: CheckoutFormFinishProps) {
        super(props);

        this.state = {
            billingEnabled: true,
            ortherContactEnaled: false
        };
    }

    public render() {
        const {
            handleChange,
            values,
            isSubmitting,
            onPrevClick,
            handleSubmit
        } = this.props;

        const orderTotal = getOrderTotalPayment(values);
        if (!orderTotal) {
            return null;
        }

        const { billingEnabled } = this.state;

        const isValid = billingEnabled
            ? !!(
                values.billingOrganization
                && values.billingAddress
                && values.billingTaxcode
            )
            : true;

        return (
            <div>
                <Form.Item
                    wrapperCol={verticalLayoutNoLabel.wrapperCol}
                >
                    <Checkbox
                        checked={billingEnabled}
                        onChange={(e) => this.setState({ billingEnabled: !billingEnabled })}
                    >
                        {text('Billing information')}
                    </Checkbox>
                </Form.Item>
                {
                    billingEnabled && (
                        <React.Fragment>
                            <FormInput
                                name={nameof<CheckoutFormValues>(o => o.billingOrganization)}
                                onChange={handleChange}
                                value={values.billingOrganization}
                                wrapperCol={verticalLayout.wrapperCol}
                                labelCol={verticalLayout.labelCol}
                                label={text('Company name')}
                                placeholder={text('input company name')}
                                required={true}
                            />
                            <FormInput
                                name={nameof<CheckoutFormValues>(o => o.billingAddress)}
                                onChange={handleChange}
                                value={values.billingAddress}
                                wrapperCol={verticalLayout.wrapperCol}
                                labelCol={verticalLayout.labelCol}
                                label={text('Company address')}
                                placeholder={text('input company address')}
                                required={true}
                            />
                            <FormInput
                                name={nameof<CheckoutFormValues>(o => o.billingTaxcode)}
                                onChange={handleChange}
                                value={values.billingTaxcode}
                                wrapperCol={verticalLayout.wrapperCol}
                                labelCol={verticalLayout.labelCol}
                                label={text('Tax code')}
                                placeholder={text('input tax code')}
                                required={true}
                            />
                        </React.Fragment>
                    )
                }
                <Divider dashed={true} />
                <FormTextArea
                    name={nameof<CheckoutFormValues>(o => o.note)}
                    onChange={handleChange}
                    value={values.note}
                    wrapperCol={verticalLayout.wrapperCol}
                    labelCol={verticalLayout.labelCol}
                    label={text('Note')}
                    placeholder={text('input your note')}
                />
                <Form.Item
                    wrapperCol={verticalLayoutNoLabel.wrapperCol}
                >
                    <Button
                        type="primary"
                        icon="check"
                        onClick={() => handleSubmit()}
                        loading={isSubmitting}
                        disabled={!isValid}
                    >
                        {text('Done')}
                    </Button>
                    <Button
                        onClick={onPrevClick}
                        disabled={isSubmitting}
                    >
                        {text('Previous')}
                    </Button>
                </Form.Item>
            </div>
        );
    }
}