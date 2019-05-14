import {
    getOrderDetailsDiscount,
    getOrderDetailsSubTotal
} from '@/business/order-detail';
import { Order } from '@/restful';

export const getOrderDiscount = (order: Partial<Order>, subTotal?: number) => {
    const {
        orderDetails,
        agencyOrderer,
        promotion
    } = order;

    if (!subTotal) {
        subTotal = getOrderDetailsSubTotal(orderDetails);
    }

    const promotionDiscount = promotion ? (promotion.discountPrice || 0) : 0;
    const productDiscount = getOrderDetailsDiscount(orderDetails);

    const agencyDiscount = (subTotal) * (agencyOrderer!.level.discountPercent * 0.01);

    const totalDiscount = promotionDiscount + productDiscount + agencyDiscount;

    return {
        promotion: promotionDiscount,
        agency: {
            discount: agencyDiscount,
            percent: agencyOrderer!.level.discountPercent,
            name: agencyOrderer!.level.name
        },
        products: productDiscount,
        total: totalDiscount
    };
};