import { MenuItem, Role } from 'qoobee';
import * as React from 'react';
import { withContext } from 'react-context-service';

import { DomainContext, WithDomainContext } from '../base';
import { mainMenu, profileMenu } from '../menus';
import { mainMenuMobile } from '../menus/mainMenuMobile';
import { roles } from '../roles-permission';

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

        setContext({
            menus: {
                MAIN: this.filterMenuByRole(mainMenu, userRole),
                MAIN_MOBILE: this.filterMenuByRole(mainMenuMobile, userRole),
                PROFILE: this.filterMenuByRole(profileMenu, userRole),
            }
        });
    }

    private readonly filterMenuByRole = (
        menuItems: MenuItem[],
        role: Role
    ): MenuItem[] => {
        const fullPermisstion = role.allowed.find(o => o.key === 'ALL');

        return menuItems.filter(menuItem => {
            if (fullPermisstion) {
                if (role.denied) {
                    return !role.denied.find(
                        o => o.url
                            ? o.url.test(menuItem.url)
                            : false
                    );
                }
                
                return true;
            }

            return role.allowed.find(
                o => o.url
                    ? o.url.test(menuItem.url)
                    : false
            );
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