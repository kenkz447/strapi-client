import { Avatar, Dropdown, Icon, Menu } from 'antd';
import * as React from 'react';
import { withContext, WithContextProps } from 'react-context-service';
import styled from 'styled-components';

import { getUserFirstName } from '@/business/user';
import { PROFILE_ACCOUNT_URL } from '@/configs';
import { WithAuthClient, WithCurrentUser, WithHistory } from '@/domain';
import { text } from '@/i18n';

interface MobileHeaderUserProps {
}

type MobileHeaderUserContext = WithHistory & WithAuthClient & WithCurrentUser;

function MobileHeaderUser(props: WithContextProps<MobileHeaderUserContext>) {
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
                    <Menu.Item key="logout">
                        <Icon type="logout" />
                        {text('Logout')}
                    </Menu.Item>
                </Menu>
            )}
        >
            <span className="mobile-header-action">
                <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                    {getUserFirstName(currentUser)[0]}
                </Avatar>
            </span>
        </Dropdown>
    );
}

export default withContext<MobileHeaderUserContext>('authClient', 'currentUser', 'history')(MobileHeaderUser);