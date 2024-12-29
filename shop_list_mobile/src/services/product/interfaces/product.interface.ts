import {QuantityType} from '../enums/quantity-type.enum';

export interface Product {
    id: string;
    name: string;
    quantity: number;
    quantityType: QuantityType;
    imageString: string;
}