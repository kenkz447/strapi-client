import { OptionProps } from 'antd/lib/select';
import * as React from 'react';

import { Address, City } from '@/restful';

export interface CheckoutFormContextProps {
    readonly cities: City[];
    readonly cityOptions: OptionProps[];
    readonly addresses: Address[];
    readonly addressOptions: OptionProps[];
}

export const CheckoutFormContext = React.createContext<CheckoutFormContextProps>({
    cities: [],
    cityOptions: [],
    addresses: [],
    addressOptions: []
});