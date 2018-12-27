import * as React from 'react';
import styled from 'styled-components';

export const PageContentWrapper = styled.div`
    display: block;
    position: relative;
    flex-grow: 1;
    .page-content-child {
        height: 100%;
        width: 100%;
        padding: 24px 24px 0 24px;
        position: absolute;
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
