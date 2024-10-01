import {QuantityType} from "./quantity-type.enum";

export interface Product {
    id: number;
    name: string;
    quantity: number;
    quantityType: QuantityType;
    imageId: string;
}
