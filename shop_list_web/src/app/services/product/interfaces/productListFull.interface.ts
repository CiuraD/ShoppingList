import {Product} from "./product.interface";

export interface ProductListFull {
    id: string;
    name: string;
    products: Array<Product>;
    userGroupId?: string;
    userId?: string;
    updatedAt?: string;
}
