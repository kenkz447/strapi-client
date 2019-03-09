import { Button, message, Steps } from 'antd';
import * as React from 'react';
import styled from 'styled-components';

import { text } from '@/i18n';

const steps = [{
    title: text('Review')
}, {
    title: text('Shipping info')
}, {
    title: text('Payment')
}, {
    title: text('Finish')
}];

const CheckoutFormStepsWrapper = styled.div`
    margin-bottom: 50px;
`;

interface CheckoutFormStepsProps {
    readonly currentStep: number;
}

export class CheckoutFormSteps extends React.PureComponent<CheckoutFormStepsProps> {
    render() {
        const { currentStep } = this.props;
        return (
            <CheckoutFormStepsWrapper>
                <Steps current={currentStep}>
                    {steps.map(item => <Steps.Step key={item.title} title={item.title} />)}
                </Steps>
            </CheckoutFormStepsWrapper>
        );
    }
}
