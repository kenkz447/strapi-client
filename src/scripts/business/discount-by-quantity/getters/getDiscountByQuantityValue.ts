import { DiscountByQuantity } from '@/restful';

import {
    getNearestDiscountByQuantityInList
} from './getNearestDiscountByQuantityInList';

export const getDiscountByQuantityValue = (
    discountByQuantities: DiscountByQuantity[] = [],
    quantity: number = 0
) => {
    const entity = getNearestDiscountByQuantityInList(discountByQuantities, quantity);
    return entity ? entity.discountPerProduct : 0;
};