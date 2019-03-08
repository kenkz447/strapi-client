import { Order } from '@/restful';

export const getOrderDeposit = (order: Partial<Order>) => {
    if (!order.totalPrice) {
        return 0;
    }

    return order.totalPrice * 0.3;
};