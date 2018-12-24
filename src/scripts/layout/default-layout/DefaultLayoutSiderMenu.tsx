import { Icon, Menu } from 'antd';
import * as React from 'react';

import { DASHBOARD_URL, USER_PATH, USER_PROFILE_URL } from '@/configs';
import { text } from '@/i18n';

interface MenuItem {
    readonly key: string;
    readonly label: string;
    readonly icon?: string;
}

interface Submenu {
    readonly key: string;
    readonly items: Array<MenuItem>;
}

interface DefaultLayoutSiderMenuProps {
    readonly onMenuItemClick: (url: string) => void;
}

interface DefaultLayoutSiderMenuState {
    readonly subMenuOpenKey: string;
    readonly currentPath: string;
}

const userSubmenu: Submenu = {
    key: USER_PATH,
    items: [{
        key: USER_PROFILE_URL,
        label: text('Profile')
    }]
};

export class DefaultLayoutSiderMenu extends React.Component<DefaultLayoutSiderMenuProps, DefaultLayoutSiderMenuState> {
    static getOpenedSubmenuKey() {
        let subMenuOpenKey = location.pathname.split('/')[1];
        if (subMenuOpenKey) {
            subMenuOpenKey = '/' + subMenuOpenKey;
        }

        return subMenuOpenKey;
    }

    static getDerivedStateFromProps(
        props: DefaultLayoutSiderMenuState,
        state: DefaultLayoutSiderMenuState
    ): DefaultLayoutSiderMenuState | null {
        if (state.currentPath !== location.pathname) {
            return {
                subMenuOpenKey: DefaultLayoutSiderMenu.getOpenedSubmenuKey(),
                currentPath: location.pathname
            };
        }

        return null;
    }

    constructor(props: DefaultLayoutSiderMenuProps) {
        super(props);
        this.state = {
            currentPath: location.pathname,
            subMenuOpenKey: DefaultLayoutSiderMenu.getOpenedSubmenuKey()
        };
    }

    render() {
        const { onMenuItemClick } = this.props;
        const { subMenuOpenKey } = this.state;

        return (
            <Menu
                mode="inline"
                style={{ width: '100%' }}
                theme="dark"
                defaultOpenKeys={[subMenuOpenKey]}
                selectedKeys={[location.pathname]}
                onClick={({ key }) => {
                    onMenuItemClick(key);
                }}
            >
                <Menu.Item key={DASHBOARD_URL}>
                    <Icon type="dashboard" />
                    <span>{text('Dashboard')}</span>
                </Menu.Item>
                {this.renderSubmenu(userSubmenu)}
            </Menu>
        );
    }

    readonly renderSubmenu = (submenu: Submenu) => {
        const { subMenuOpenKey } = this.state;
        const { key, items } = submenu;

        return (
            <Menu.SubMenu
                key={key}
                title={(
                    <span>
                        <Icon type="user" />
                        <span>{text('User')}</span>
                    </span>
                )}
                onTitleClick={() => {
                    if (subMenuOpenKey === key) {
                        return void this.setState({ subMenuOpenKey: '' });
                    }
                    this.setState({ subMenuOpenKey: key });
                }}
            >
                {items.map(item => {
                    return (
                        <Menu.Item key={item.key}>
                            <span>{text(item.label)}</span>
                        </Menu.Item>
                    );
                })}
            </Menu.SubMenu>
        );
    }
}