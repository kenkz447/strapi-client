import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface PageWrapperContentProps {
    readonly backgroundColor?: string;
}

const PageWrapperContent = styled.div`
    min-height: inherit;
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${(props: PageWrapperContentProps) => props.backgroundColor};
    display: flex;
    flex-flow: row wrap;
    overflow-y: overlay;
`;
interface PageWrapperProps extends PageWrapperContentProps {
    readonly className?: string;
}

export class PageWrapper extends React.PureComponent<PageWrapperProps> {
    static readonly defaultProps = {
        backgroundColor: '#f0f2f5'
    };

    componentDidMount() {
        if (document.documentElement) {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        }
    }

    render() {
        const { backgroundColor } = this.props;
        return (
            <PageWrapperContent
                backgroundColor={backgroundColor}
            >
                {this.props.children}
            </PageWrapperContent>
        );
    }
}