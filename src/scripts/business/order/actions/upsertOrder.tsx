import { Order, orderResources, request } from '@/restful';
import { genCodeWithCurrentDate } from '@/utilities';

export const upsertOrder = (order: Partial<Order>) => {
    const orderExisting = !!order.id;
    if (orderExisting) {
        return request(orderResources.update, {
            type: 'body',
            value: order
        });
    }

    return request(orderResources.create, {
        type: 'body',
        value: {
            ...order,
            code: genCodeWithCurrentDate()
        }
    });
};