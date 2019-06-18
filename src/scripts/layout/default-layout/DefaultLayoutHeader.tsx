import { Button, Divider } from 'antd';
import { AccessControl, RootContext } from 'qoobee';
import * as React from 'react';
import styled from 'styled-components';

import { DomainContext, policies } from '@/domain';
import { text } from '@/i18n';

import {
    HeaderCartButton,
    HeaderNotification,
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
    const { currentUser, authClient } = React.useContext(RootContext) as DomainContext;

    return (
        <DefaultLayoutHeaderWrapper>
            <div style={{ flexGrow: 1 }} />
            {
                currentUser
                    ? (
                        <React.Fragment>
                            <AccessControl policy={policies.functionAllowed} funcKey="FUNC_ADD_TO_CART">
                                {() => <HeaderCartButton />}
                            </AccessControl>
                            <HeaderUserActions />
                            <HeaderNotification />
                            <HeaderSelectLanguage />
                        </React.Fragment>
                    )
                    : (
                        <Button onClick={() => authClient.gotoLoginPage()}>
                            {text('Login')}
                        </Button>
                    )
            }

        </DefaultLayoutHeaderWrapper>
    );
}