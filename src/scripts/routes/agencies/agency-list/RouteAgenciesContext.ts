import React from 'react';

import { AgencyLevel } from '@/restful';

export interface RouteAgenciesContextProps {
    readonly agencyLevels: AgencyLevel[];
}

export const RouteAgenciesContext = React.createContext<RouteAgenciesContextProps>({
    agencyLevels: []
});