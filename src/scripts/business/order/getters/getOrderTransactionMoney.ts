import { Order } from '@/restful';

export const getOrderTransactionMoney = (order: Partial<Order>) => {
    const { orderTransactions } = order;
    if (!orderTransactions) {
        return 0;
    }

    return orderTransactions.reduce((total, transaction) => total += transaction.money, 0);
};