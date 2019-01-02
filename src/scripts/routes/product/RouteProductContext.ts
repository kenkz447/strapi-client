import * as React from 'react';

interface RouteProductContextProps {
    readonly currentModulesCode?: string;
}

export const RouteProductContext = React.createContext<RouteProductContextProps>({
});