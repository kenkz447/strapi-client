import { Record } from 'react-restful';

export interface AgencyLevel {
    readonly id: string;
    readonly name: string;
    readonly discountPercent: number;
}