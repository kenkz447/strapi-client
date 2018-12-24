import * as React from 'react';
import styled from 'styled-components';

const BlankLayoutWrapper = styled.div`
    height: 100vh;
    background: #F7F7F7;
`;

const BlankLayoutContent = styled.div`
    height: inherit;
    margin: 0 auto;
    background: #fff;
    width: 100%;
`;

interface BlankLayoutProps {
}

export class BlankLayout extends React.Component<BlankLayoutProps> {
    render() {
        const { children } = this.props;

        return (
            <BlankLayoutWrapper>
                <BlankLayoutContent>
                    {children}
                </BlankLayoutContent>
            </BlankLayoutWrapper>
        );
    }
}