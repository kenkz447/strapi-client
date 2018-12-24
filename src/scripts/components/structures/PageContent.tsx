import styled from 'styled-components';

interface PageContentProps {
    readonly display?: string;
    readonly padding?: string;
}

interface PageContentProps {
    readonly noScroll?: boolean;
}

export const PageContent = styled.div`
    height: ${({ noScroll }: PageContentProps) => noScroll && 'calc(100% - 88px)'};
    overflow: ${({ noScroll }: PageContentProps) => noScroll && 'hidden'};
    min-height: calc(100% - 88px);
    width: 100%;
    margin: 88px 24px 0 24px;
    display: block;
    position: relative;
    > :first-child {
        min-height: 100%;
        background: #fff; 
    }

    .ant-layout {
        min-height: 100%;
        background: #fff;
        &-header {
            background: transparent;
            padding: 0 0;
            height: unset;
            line-height: unset;
        }
        &-content {
            background: transparent;
        }
        &-footer {
            background: transparent; 
            color: unset;
            font-size: unset;
        }
    }
`;