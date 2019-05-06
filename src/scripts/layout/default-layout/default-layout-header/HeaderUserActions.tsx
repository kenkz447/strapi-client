import { Dropdown, Icon, Menu } from 'antd';
import * as React from 'react';
import { withContext, WithContextProps } from 'react-context-service';
import styled from 'styled-components';

import { getUserFirstName } from '@/business/user';
import { PROFILE_ACCOUNT_URL } from '@/configs';
import { WithAuthClient, WithCurrentUser, WithHistory } from '@/domain';
import { text } from '@/i18n';

const Avatar = styled.img`
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 10px;
`;

const AccountName = styled.span`
    display: inline-block;
    vertical-align: middle;
`;

const defaultAvatar = 'http://tinygraphs.com/labs/squares/random?theme=frogideas';

export interface HeaderUserActionsProps {
}

type HeaderUserActionsContext = WithHistory & WithAuthClient & WithCurrentUser;

function HeaderUserActions(props: WithContextProps<HeaderUserActionsContext>) {
    const { currentUser, authClient, history } = props;
    return (
        <Dropdown
            overlay={(
                <Menu
                    onClick={({ key }) => {
                        if (key === 'logout') {
                            return void authClient.logout();
                        }
                        
                        history.push(key);
                    }}
                >
                    <Menu.Item key={PROFILE_ACCOUNT_URL}>
                        <Icon type="user" />
                        {text('Account settings')}
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item key="logout">
                        <Icon type="logout" />
                        {text('Logout')}
                    </Menu.Item>
                </Menu>
            )}
        >
            <span className="header-action">
                <Avatar src={defaultAvatar} />
                <AccountName>{getUserFirstName(currentUser)}</AccountName>
            </span>
        </Dropdown>
    );
}

export default withContext<HeaderUserActionsContext>('authClient', 'currentUser', 'history')(HeaderUserActions);