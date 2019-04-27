import * as React from 'react';
import styled from 'styled-components';

import { MobileHeaderUser } from './mobile-layout-header';

const MobileLayoutHeaderWrapper = styled.div`
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

export interface MobileLayoutHeaderProps {
}

export function MobileLayoutHeader() {
    return (
        <MobileLayoutHeaderWrapper>
            <div className="flex-grow-1" />
            <MobileHeaderUser />
        </MobileLayoutHeaderWrapper>
    );
}