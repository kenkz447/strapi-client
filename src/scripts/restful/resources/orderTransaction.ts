import { Resource, ResourceType } from 'react-restful';

import { Order } from './order';

export interface OrderTransaction {
    readonly id?: string;
    readonly name: string;
    readonly type: 'deposit' | 'payment' | 'refund';
    readonly note: string;
    readonly date: string;
    readonly order: Partial<Order>;
    readonly money: number;
    readonly code: string;
}

export const orderTransactionType = new ResourceType<OrderTransaction>(nameof<OrderTransaction>());

export const orderTransactionResources = {
    find: new Resource<OrderTransaction, OrderTransaction[]>({
        resourceType: orderTransactionType,
        url: '/orderTransaction',
    }),
    create: new Resource<OrderTransaction>({
        resourceType: orderTransactionType,
        url: '/orderTransaction',
        method: 'POST'
    }),
    delete: new Resource<OrderTransaction>({
        resourceType: orderTransactionType,
        url: '/orderTransaction/:id',
        method: 'DELETE'
    })
};