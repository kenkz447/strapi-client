import { Icon, Menu } from 'antd';
import { RootContext } from 'qoobee';
import * as React from 'react';

import { PRODUCT_PATH } from '@/configs';
import { DomainContext } from '@/domain';
import { text } from '@/i18n';

interface DefaultLayoutSiderMenuProps {
    readonly onMenuItemClick: (url: string) => void;
}

interface DefaultLayoutSiderMenuState {
    readonly subMenuOpenKey: string;
    readonly currentPath: string;
}
export class DefaultLayoutSiderMenu extends React.Component<DefaultLayoutSiderMenuProps, DefaultLayoutSiderMenuState> {
    static readonly contextType = RootContext;
    readonly context!: DomainContext;

    static getOpenedSubmenuKey() {
        let subMenuOpenKey = location.pathname.split('/')[1];
        if (subMenuOpenKey) {
            subMenuOpenKey = '/' + subMenuOpenKey;
        }

        return subMenuOpenKey;
    }

    static getDerivedStateFromProps(
        props: DefaultLayoutSiderMenuProps,
        state: DefaultLayoutSiderMenuState
    ): DefaultLayoutSiderMenuState | null {

        if (location.pathname.startsWith(PRODUCT_PATH)) {
            return {
                subMenuOpenKey: DefaultLayoutSiderMenu.getOpenedSubmenuKey(),
                currentPath: PRODUCT_PATH
            };
        }

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
        const { menus } = this.context;
        const { onMenuItemClick } = this.props;
        const { subMenuOpenKey, currentPath } = this.state;

        if (!menus) {
            return;
        }

        const mainMenuItems = menus.MAIN;

        return (
            <Menu
                mode="inline"
                style={{ width: '100%' }}
                theme="dark"
                defaultOpenKeys={[subMenuOpenKey]}
                selectedKeys={[currentPath]}
                onClick={({ key }) => {
                    onMenuItemClick(key);
                }}
            >
                {mainMenuItems.map(o => (
                    <Menu.Item key={o.url}>
                        <Icon type={o.icon} />
                        <span>{text(o.label)}</span>
                    </Menu.Item>
                ))}
            </Menu>
        );
    }
}