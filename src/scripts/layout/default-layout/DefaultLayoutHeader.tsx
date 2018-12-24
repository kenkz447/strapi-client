import * as React from 'react';
import styled from 'styled-components';

import {
    HeaderSelectLanguage,
    HeaderUserActions
} from './default-layout-header';

const DefaultLayoutHeaderWrapper = styled.div`
    padding: 0 24px;
    display: flex;
    align-items: center;
    flex-grow: 1;

    .header-action {
        cursor: pointer;
        padding: 0 12px;
        display: inline-block;
        transition: all .3s;
        height: 100%;
        font-size: 14px;
        vertical-align: top;
        line-height: 64px;
        &:hover {
            background: rgba(0,0,0,.025);
        }
        svg {
            vertical-align: middle;
        }
    }
`;

export interface DefaultLayoutHeaderProps {
}

export function DefaultLayoutHeader(props: DefaultLayoutHeaderProps) {
    return (
        <DefaultLayoutHeaderWrapper>
            <div style={{ flexGrow: 1 }} />
            <HeaderUserActions />
            <HeaderSelectLanguage />
        </DefaultLayoutHeaderWrapper>
    );
}
