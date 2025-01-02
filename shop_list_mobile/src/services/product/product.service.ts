import { Product } from './interfaces/product.interface';
import { ProductListFull } from './interfaces/productListFull.interface';
import { ProductListLazy } from './interfaces/productListLazy.interface';
import axiosConfig from '../../configs/axios/axiosConfig';

export const productService = {
    getProductListsForUser: async (userName: string): Promise<ProductListLazy[]> => {
        const response = await axiosConfig.get<ProductListLazy[]>(`users/productLists/${userName}`);
        return response.data;
    },
    getLatestProductListForUser: async (userName: string): Promise<ProductListFull> => {
        const response = await axiosConfig.get<ProductListFull>(`productLists/latest/${userName}`);
        return response.data;
    },
    getProductsForList: async (listId: string): Promise<Product[]> => {
        const response = await axiosConfig.get<Product[]>(`products/productList/${listId}`);
        return response.data;
    },
    getProductListLazy: async (listId: string): Promise<ProductListLazy> => {
        const response = await axiosConfig.get<ProductListLazy>(`productLists/${listId}`);
        return response.data;
    },
    createList: async (list: ProductListFull): Promise<ProductListFull> => {
        const response = await axiosConfig.post<ProductListFull>('users/addProductList', list);
        return response.data;
    },
    updateList: async (list: ProductListFull): Promise<ProductListFull> => {
        const response = await axiosConfig.put<ProductListFull>('users/updateProductList', list);
        return response.data;
    },
    deleteProduct: async (productId: string): Promise<any> => {
        const response = await axiosConfig.delete<any>(`products/${productId}`);
        return response.data;
    },
    deleteList: async (listId: string): Promise<any> => {
        const response = await axiosConfig.delete<any>(`productLists/delete/${listId}`);
        return response.data;
    },
    shareList: async (listId: string, userGroupId: string): Promise<any> => {
        const response = await axiosConfig.put<any>(`productLists/shareListWithGroup/${listId}`, userGroupId);
        return response.data;
    },
    unshareList: async (listId: string): Promise<any> => {
        const response = await axiosConfig.put<any>(`productLists/unshareListWithGroup/${listId}`, {});
        return response.data;
    },
};
