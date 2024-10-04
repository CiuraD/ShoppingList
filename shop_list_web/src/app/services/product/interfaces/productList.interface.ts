export interface ProductList {
    id: string;
    name: string;
    productsId: Array<string>;
    userGroupId?: string;
    userId: string;
}
