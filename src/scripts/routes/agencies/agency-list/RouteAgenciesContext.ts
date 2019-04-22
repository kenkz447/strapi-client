import React from 'react';

import { AgencyLevel, AgencyType } from '@/restful';

export interface RouteAgenciesContextProps {
    readonly agencyLevels: AgencyLevel[];
    readonly agencyTypes: AgencyType[];
}

export const RouteAgenciesContext = React.createContext<RouteAgenciesContextProps>({
    agencyLevels: [],
    agencyTypes: []
});