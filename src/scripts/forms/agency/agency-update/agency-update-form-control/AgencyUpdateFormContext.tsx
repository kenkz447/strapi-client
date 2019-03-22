import { OptionProps } from 'antd/lib/select';
import * as React from 'react';

import { City } from '@/restful';

export interface AgencyUpdateFormContextProps {
    readonly cities: City[];
    readonly cityOptions: OptionProps[];
}

export const AgencyUpdateFormContext = React.createContext<AgencyUpdateFormContextProps>({
    cities: [],
    cityOptions: []
});