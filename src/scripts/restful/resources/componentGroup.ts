import { FurnitureComponent } from './furnitureComponent';

export interface ComponentGroup {
    readonly id: string;
    readonly name: string;
    readonly components: FurnitureComponent[];
}