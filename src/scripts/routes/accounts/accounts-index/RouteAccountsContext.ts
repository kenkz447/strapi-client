import React from 'react';

import { Role } from '@/restful';
import { Reflink } from '@/restful/resources/Reflink';

export interface RouteAccountsContextProps {
    readonly roles: Role[];
    readonly reflinks: Reflink[];
}

export const RouteAccountsContext = React.createContext<RouteAccountsContextProps>({
    roles: [],
    reflinks: []
});