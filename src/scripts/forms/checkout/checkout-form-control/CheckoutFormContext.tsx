import { OptionProps } from 'antd/lib/select';
import * as React from 'react';

import { City } from '@/restful';

export interface CheckoutFormContextProps {
    readonly cities: City[];
    readonly cityOptions: OptionProps[];
}

export const CheckoutFormContext = React.createContext<CheckoutFormContextProps>({
    cities: [],
    cityOptions: []
});