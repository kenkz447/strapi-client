import React from 'react';

import { Role } from '@/restful';

export interface RouteAccountsContextProps {
    readonly roles: Role[];
}

export const RouteAccountsContext = React.createContext<RouteAccountsContextProps>({
    roles: []
});