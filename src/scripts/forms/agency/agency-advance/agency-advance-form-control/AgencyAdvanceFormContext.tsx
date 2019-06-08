import { OptionProps } from 'antd/lib/select';
import * as React from 'react';

import { City } from '@/restful';

export interface AgencyAdvanceFormContextProps {
    readonly cities: City[];
    readonly cityOptions: OptionProps[];
}

export const AgencyAdvanceFormContext = React.createContext<AgencyAdvanceFormContextProps>({
    cities: [],
    cityOptions: []
});