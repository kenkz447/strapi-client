import { Resource, ResourceType } from 'react-restful';

import { Order } from './order';

export interface OrderTransaction {
    readonly id?: string;
    readonly name: string;
    readonly type: 'deposit' | 'payment' | 'refund';
    readonly note: string;
    readonly date: string;
    readonly order: Partial<Order> | string;
    readonly money: number;
    readonly code: string;
}

export const orderTransactionResourceType = new ResourceType<OrderTransaction>(nameof<OrderTransaction>());

export const orderTransactionResources = {
    find: new Resource<OrderTransaction, OrderTransaction[]>({
        resourceType: orderTransactionResourceType,
        url: '/orderTransaction',
    }),
    create: new Resource<OrderTransaction>({
        resourceType: orderTransactionResourceType,
        url: '/orderTransaction',
        method: 'POST'
    }),
    update: new Resource<OrderTransaction>({
        resourceType: orderTransactionResourceType,
        url: '/orderTransaction',
        method: 'PUT'
    }),
    delete: new Resource<OrderTransaction>({
        resourceType: orderTransactionResourceType,
        url: '/orderTransaction/:id',
        method: 'DELETE'
    })
};