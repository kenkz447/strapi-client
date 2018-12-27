import { Record, Resource, ResourceType } from 'react-restful';

import { Agency } from './agency';
import { City } from './city';
import { County } from './county';
import { OrderDetail } from './orderDetail';
import { OrderTransaction } from './orderTransaction';
import { Promotion } from './promotion';
import { User } from './user';

export interface Order extends Record {
    readonly id: string;
    readonly orderDetails: OrderDetail[];
    readonly phone: string;
    readonly email: string;
    readonly shippingAddress: string;
    readonly shippingDate: string;
    readonly depositRequired: number;
    readonly paid: boolean;
    readonly totalPrice: number;
    readonly status: 'new' | 'confirmed' | 'produce' | 'payment' | 'shipping' | 'done' | 'cancel' | 'change';
    readonly createdAt?: string;
    readonly promotion?: Promotion;
    readonly note?: string;
    readonly shippingToCity: City;
    readonly shippingToCounty: County;
    readonly county: County;
    readonly shippingFee: number;
    readonly totalOfPayment: number;
    readonly totalDiscount: number;
    readonly productsDiscount: number;
    readonly promotionDiscount: number;
    readonly agencyCommissionPercent: number;
    readonly agencyCommissionValue: number;
    readonly billDiscount: number;
    readonly code: string;
    readonly agencyOrderer: Agency;
    readonly orderTransactions: Array<OrderTransaction>;
    readonly created_by: User;

    readonly contactTo?: string;
    readonly contactToPhone?: string;

    readonly billingOrganization?: string;
    readonly billingTaxcode?: string;
    readonly billingAddress?: string;

    readonly addressType: 'apartment' | 'home';
}

export const orderResourceType = new ResourceType<Order>(nameof<Order>());

export const orderResources = {
    find: new Resource<Order, Order[]>({
        resourceType: orderResourceType,
        url: '/order'
    }),
    findOne: new Resource<Order>({
        resourceType: orderResourceType,
        url: '/order/:id'
    }),
    add: new Resource<Order>({
        resourceType: orderResourceType,
        url: '/order',
        method: 'POST'
    }),
    update: new Resource<Order>({
        resourceType: orderResourceType,
        url: '/order/:id',
        method: 'PUT',
    }),
    delete: new Resource<Order>({
        resourceType: orderResourceType,
        url: '/order/:id',
        method: 'DELETE'
    })
};