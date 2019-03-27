import { Menu, Tabs } from 'antd';
import { RootContext } from 'qoobee';
import * as React from 'react';
import styled from 'styled-components';

import {
    PROFILE_ACCOUNT_URL,
    PROFILE_ADDRESS_BOOK_URL,
    PROFILE_AGENCY_URL,
    PROFILE_PASSWORD_URL
} from '@/configs';
import { DomainContext } from '@/domain';
import { text } from '@/i18n';

const { TabPane } = Tabs;

const ProfileLayoutWrapper = styled.div`
    display: flex;
    width: calc(100% - 48px);
    height: calc(100% - 24px);
    padding-top: 16px;
    padding-bottom: 16px;
    overflow: auto;
    background-color: #fff;
    margin: 24px 24px 0 24px;
    .ant-menu {
        width: 200px;
        &-item-selected {
            font-weight: bold;
        }
    }
    .profile-layout-content {
        flex-grow: 1;
        position: relative;
    }
`;

interface ProfileLayoutProps {
}

export class ProfileLayout extends React.PureComponent<ProfileLayoutProps> {
    public static readonly contextType = RootContext;
    public readonly context!: DomainContext;

    private readonly onMenuClick = ({ key }) => {
        const { history } = this.context;

        history.push(key);
    }

    public render() {

        return (
            <ProfileLayoutWrapper>
                <Menu
                    mode="inline"
                    onClick={this.onMenuClick}
                    selectedKeys={[location.pathname]}
                >
                    <Menu.Item key={PROFILE_ACCOUNT_URL}>
                        {text('Tài khoản')}
                    </Menu.Item>
                    <Menu.Item key={PROFILE_PASSWORD_URL}>
                        {text('Đổi mật khẩu')}
                    </Menu.Item>
                    <Menu.Item key={PROFILE_AGENCY_URL}>
                        {text('Thông tin đại lý')}
                    </Menu.Item>
                    <Menu.Item key={PROFILE_ADDRESS_BOOK_URL}>
                        {text('Sổ địa chỉ')}
                    </Menu.Item>
                </Menu>
                <div className="profile-layout-content">
                    {this.props.children}
                </div>
            </ProfileLayoutWrapper>
        );
    }
}