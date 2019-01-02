import { FurnitureComponent } from './furnitureComponent';

export interface FurnitureComponentGroup {
    readonly id: string;
    readonly name: string;
    readonly components: FurnitureComponent[];
}