import { OptionProps } from 'antd/lib/select';
import * as React from 'react';

import { City } from '@/restful';

export interface AddressFormContextProps {
    readonly cities: City[];
    readonly cityOptions: OptionProps[];
}

export const AddressFormContext = React.createContext<AddressFormContextProps>({
    cities: [],
    cityOptions: []
});