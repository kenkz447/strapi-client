import { Button, message, Steps } from 'antd';
import * as React from 'react';
import styled from 'styled-components';

const steps = [{
    title: 'First'
}, {
    title: 'Second',
}, {
    title: 'Last'
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
