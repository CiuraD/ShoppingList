import { Product } from '../../models/product.model';
import { ProductListFull } from './interfaces/productListFull.interface';
import { ProductListLazy } from './interfaces/productListLazy.interface';
import axiosConfig from '../../configs/axios/axiosConfig';

export const productService = {
    getProductListsForUser: async (userName: string): Promise<ProductListLazy[]> => {
        const response = await axiosConfig.get<ProductListLazy[]>(`/api/users/productLists/${userName}`);
        return response.data;
    },
    getLatestProductListForUser: async (userName: string): Promise<ProductListFull> => {
        const response = await axiosConfig.get<ProductListFull>(`/api/productLists/latest/${userName}`);
        return response.data;
    },
    getProductsForList: async (listId: string): Promise<Product[]> => {
        const response = await axiosConfig.get<Product[]>(`/api/products/productList/${listId}`);
        return response.data;
    },
    getProductListLazy: async (listId: string): Promise<ProductListLazy> => {
        const response = await axiosConfig.get<ProductListLazy>(`/api/productLists/${listId}`);
        return response.data;
    },
    createList: async (list: ProductListFull): Promise<ProductListFull> => {
        const response = await axiosConfig.post<ProductListFull>('/api/users/addProductList', list);
        return response.data;
    },
    updateList: async (list: ProductListFull): Promise<ProductListFull> => {
        const response = await axiosConfig.put<ProductListFull>('/api/users/updateProductList', list);
        return response.data;
    },
    deleteProduct: async (productId: string): Promise<any> => {
        const response = await axiosConfig.delete<any>(`/api/products/${productId}`);
        return response.data;
    },
    deleteList: async (listId: string): Promise<any> => {
        const response = await axiosConfig.delete<any>(`/api/productLists/delete/${listId}`);
        return response.data;
    },
    shareList: async (listId: string, userGroupId: string): Promise<any> => {
        const response = await axiosConfig.put<any>(`/api/productLists/shareListWithGroup/${listId}`, userGroupId);
        return response.data;
    },
    unshareList: async (listId: string): Promise<any> => {
        const response = await axiosConfig.put<any>(`/api/productLists/unshareListWithGroup/${listId}`, {});
        return response.data;
    },
};
