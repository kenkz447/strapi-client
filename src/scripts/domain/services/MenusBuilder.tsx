import * as React from 'react';
import { withContext } from 'react-context-service';

import { MenuItem } from '@/app';

import { DomainContext, WithDomainContext } from '../base';
import { mainMenu } from '../menus';
import { Role, roles } from '../roles-permission';

type MenusBuilderProps =
    WithDomainContext
    & Pick<DomainContext, 'currentUser'>
    & Pick<DomainContext, 'menus'>;

class MenusBuilder extends React.PureComponent<MenusBuilderProps> {
    private readonly buildMenus = () => {
        const { setContext, currentUser } = this.props;

        const curentRole = currentUser.role;
        
        if (!curentRole) {
            return;
        }

        const userRole = roles.find(o => o.key === curentRole.name);
        if (!userRole) {
            return;
        }

        const fullPermisstion = userRole.allowed.find(o => o.key === 'ALL');
        if (fullPermisstion) {
            setContext({
                menus: {
                    MAIN: mainMenu
                }
            });
            return;
        }

        setContext({
            menus: {
                MAIN: this.filterMenuByRole(mainMenu, userRole)
            }
        });
    }

    private readonly filterMenuByRole = (
        menuItems: MenuItem[],
        role: Role
    ): MenuItem[] => {
        return menuItems.filter(menuItem => {
            return role.allowed.find(o => o.url ? o.url.test(menuItem.url) : false);
        });
    }

    public componentDidUpdate() {
        const {
            menus,
            currentUser
        } = this.props;

        if (menus || !currentUser) {
            return;
        }

        this.buildMenus();
    }

    public render() {
        return null;
    }
}

export default withContext<DomainContext>('currentUser', 'menus')(MenusBuilder);