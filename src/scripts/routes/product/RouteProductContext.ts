import * as React from 'react';

interface RouteProductContextProps {
    readonly currentModulesCode?: string;
}

export const RouteProductContext = React.createContext<RouteProductContextProps>({
});

export const CLEAR_3D_SENCE_CONTEXT_EVENT = 'CLEAR_3D_SENCE_CONTEXT_EVENT';
export const CLEAR_3D_SENCE_SELECT_EVENT = 'CLEAR_3D_SENCE_SELECT_EVENT';