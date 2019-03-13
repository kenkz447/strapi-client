import { FormikProps } from 'formik';
import * as React from 'react';
import styled from 'styled-components';

import { FormBody } from '@/components';
import { Order } from '@/restful';

import {
    CheckoutFormAddress,
    CheckoutFormFinish,
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
    .checkout-form-meta {
        width: 100px;
        display: inline-block;
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
            currentStep: 1
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

    public render() {
        const { currentStep } = this.state;
        return (
            <CheckoutFormWrapper>
                <FormBody formProps={this.props}>
                    <CheckoutFormSteps currentStep={currentStep} />
                    <div className="checkout-form-content">
                        {
                            currentStep === 1
                                ? <CheckoutFormAddress {...this.props} onNextClick={this.next} />
                                : null
                        }
                        {
                            currentStep === 2
                                ? (
                                    <CheckoutFormPayment
                                        {...this.props}
                                        onNextClick={this.next}
                                        onPrevClick={this.prev}
                                    />
                                )
                                : null
                        }
                        {
                            currentStep === 3
                                ? (
                                    <CheckoutFormFinish
                                        {...this.props}
                                        onNextClick={this.next}
                                        onPrevClick={this.prev}
                                    />
                                )
                                : null
                        }
                    </div>
                </FormBody>
            </CheckoutFormWrapper>
        );
    }
}