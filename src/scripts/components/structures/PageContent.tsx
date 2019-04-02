import * as React from 'react';
import styled from 'styled-components';

export const PageContentWrapper = styled.div`
    display: block;
    position: relative;
    flex-grow: 1;
    &.scroll {
        overflow-y: overlay;
    }
    .page-content-child {
        height: 100%;
        width: 100%;
        padding: 24px 24px 0 24px;
        position: absolute;
    }
    .page-content-child-scroll {
        height: calc(100% - 24px);
        width:  calc(100% - 48px);
        margin: 24px 24px 0 24px;
        position: relative;
        overflow-y: visible;
    }
`;

export const PageContent: React.FunctionComponent = (props) => {
    return (
        <PageContentWrapper>
            <div className="page-content-child">
                {props.children}
            </div>
        </PageContentWrapper>
    );
};

export const PageContentScroll: React.FunctionComponent = (props) => {
    return (
        <PageContentWrapper className="scroll">
            <div className="page-content-child-scroll">
                {props.children}
            </div>
        </PageContentWrapper>
    );
};
