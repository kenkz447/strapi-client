import { Promotion } from './promotion';

export interface Reflink {
    readonly id: string;
    readonly name: string;
    readonly code: string;
    readonly expirationDate: string;
    readonly promotion: Promotion;
}