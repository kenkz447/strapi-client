import { MOBILE_URL_PREFIX } from '@/configs';

import { DefaultLayoutSiderMenu } from '../default-layout';

export class MobileLayoutSiderMenu extends DefaultLayoutSiderMenu {
    readonly getSelectedKey = () => {
        const currentPath = location.pathname;
        const pathStrs = currentPath.split('/');
        const key = MOBILE_URL_PREFIX + pathStrs[1];
        return key;
    }
}