import { Icon, Menu } from 'antd';
import { RootContext } from 'qoobee';
import * as React from 'react';

import {
    CATALOG_BASE_PATH,
    DASHBOARD_BASE_PATH,
    PRODUCT_PATH
} from '@/configs';
import { DomainContext } from '@/domain';
import { text } from '@/i18n';

interface DefaultLayoutSiderMenuProps {
    readonly onMenuItemClick: (url: string) => void;
    readonly menuName?: string;
}

interface DefaultLayoutSiderMenuState {
    readonly subMenuOpenKey: string;
    readonly currentPath: string;
}
export class DefaultLayoutSiderMenu extends React.Component<DefaultLayoutSiderMenuProps, DefaultLayoutSiderMenuState> {
    static readonly defaultProps: Partial<DefaultLayoutSiderMenuProps> = {
        menuName: 'MAIN'
    };

    static readonly contextType = RootContext;
    readonly context!: DomainContext;

    readonly getSelectedKey = () => {
        const currentPath = location.pathname;
        const pathStrs = currentPath.split('/');
        const key = '/' + pathStrs[1];
        return key;
    }

    public render() {
        const { history, menus } = this.context;
        const { menuName } = this.props;

        const menuItems = menus![menuName!];
        return (
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={[this.getSelectedKey()]}
                onClick={({ key }) => {
                    if (location.pathname.startsWith(key)) {
                        return;
                    }

                    history.push(key);
                }}
            >
                {
                    menuItems.map(o => {
                        return (
                            <Menu.Item key={o.url}>
                                <Icon type={o.icon} /> <span>{o.label}</span>
                            </Menu.Item>
                        );
                    })
                }
            </Menu>
        );
    }
}