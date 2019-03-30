import { DomainContext } from '@/domain';
import { Order, orderResources, request } from '@/restful';
import { genCodeWithCurrentDate } from '@/utilities';

import { getOrderDeposit, getOrderShippingDate } from '../getters';

export const upsertOrder = (order: Partial<Order>, context: DomainContext) => {
    const { currentAgency } = context;

    if (!order.orderDetails || !currentAgency) {
        throw 'WTF???';
    }

    const orderExisting = !!order.id;
    if (orderExisting) {
        return request(orderResources.update, {
            type: 'body',
            value: order
        });
    }

    const shippingDate = getOrderShippingDate();

    return request(orderResources.create, {
        type: 'body',
        value: {
            ...order,
            code: genCodeWithCurrentDate(),
            depositRequired: getOrderDeposit(order),
            totalProduct: order.orderDetails.reduce(
                (total, detail) => total + detail.quantity,
                0
            ),
            shippingDate: shippingDate.toISOString(),
            status: 'new'
        } as Order
    });
};