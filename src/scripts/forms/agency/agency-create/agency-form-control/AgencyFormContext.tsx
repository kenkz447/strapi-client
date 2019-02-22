import { OptionProps } from 'antd/lib/select';
import * as React from 'react';

import { City } from '@/restful';

export interface AgencyFormContextProps {
    readonly cities: City[];
    readonly cityOptions: OptionProps[];
}

export const AgencyFormContext = React.createContext<AgencyFormContextProps>({
    cities: [],
    cityOptions: []
});