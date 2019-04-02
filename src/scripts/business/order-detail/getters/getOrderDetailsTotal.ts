import { OrderDetail } from '@/restful';

export const getOrderDetailsTotal = (orderDetails: OrderDetail[] = []) => {
    return orderDetails.reduce(
        (currentValue, orderDetail) => {
            return currentValue + (orderDetail.subTotalPrice);
        },
        0
    );
};