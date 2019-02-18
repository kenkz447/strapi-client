import { FormikProps } from 'formik';
import * as React from 'react';
import styled from 'styled-components';

import { getAllOrderStatus } from '@/business/order';
import {
    FormBody,
    FormDatePicker,
    FormSelect,
    verticalLayout
} from '@/components';
import { text } from '@/i18n';
import { Order } from '@/restful';

import {
    CheckoutFormAddress,
    CheckoutFormPayment,
    CheckoutFormSteps
} from './checkout-form';

const CheckoutFormWrapper = styled.div`
    max-width: 700px;
    margin: 0 auto;
    .checkout-form-content {
        max-width: 500px;
        margin: 0 auto;
    }
    .ant-alert {
        margin-bottom: 24px;
    }
    .checkout-total-payment {
        font-size: 20px;
        line-height: 0;
    }
`;

export type CheckoutFormValues = Partial<Order>;

export interface CheckoutFormOwnProps extends FormikProps<CheckoutFormValues> {
}

interface CheckoutFormStepsState {
    readonly currentStep: number;
}

export class CheckoutForm extends React.PureComponent<CheckoutFormOwnProps, CheckoutFormStepsState> {
    constructor(props: CheckoutFormOwnProps) {
        super(props);
        this.state = {
            currentStep: 1,
        };
    }

    private readonly next = () => {
        const currentStep = this.state.currentStep + 1;
        this.setState({ currentStep });
    }

    private readonly prev = () => {
        const currentStep = this.state.currentStep - 1;
        this.setState({ currentStep });
    }

    render() {
        const {
            values,
            errors,
            setFieldValue
        } = this.props;
        const { currentStep } = this.state;
        return (
            <CheckoutFormWrapper>
                <FormBody formProps={this.props}>
                    <CheckoutFormSteps currentStep={currentStep} />
                    <div className="checkout-form-content">
                        {
                            currentStep === 0
                                ? <CheckoutFormAddress {...this.props} onNextClick={this.next} />
                                : (
                                    <CheckoutFormPayment
                                        {...this.props}
                                        onNextClick={this.next}
                                        onPrevClick={this.prev}
                                    />
                                )
                        }
                    </div>
                </FormBody>
            </CheckoutFormWrapper>
        );
    }
}