import { productService } from './product.service';
import axiosConfig from '../../configs/axios/axiosConfig';
import { Product } from './interfaces/product.interface';
import { ProductListFull } from './interfaces/productListFull.interface';
import { ProductListLazy } from './interfaces/productListLazy.interface';

jest.mock('../../configs/axios/axiosConfig');

describe('productService', () => {
    const mockUserName = 'testUser';
    const mockListId = 'testListId';
    const mockProductId = 'testProductId';
    const mockUserGroupId = 'testUserGroupId';
    const mockProductListFull: ProductListFull = { /* mock data */ };
    const mockProductListLazy: ProductListLazy = { /* mock data */ };
    const mockProducts: Product[] = [ /* mock data */ ];

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should get product lists for user', async () => {
        (axiosConfig.get as jest.Mock).mockResolvedValue({ data: [mockProductListLazy] });
        const result = await productService.getProductListsForUser(mockUserName);
        expect(result).toEqual([mockProductListLazy]);
        expect(axiosConfig.get).toHaveBeenCalledWith(`users/productLists/${mockUserName}`);
    });

    it('should get latest product list for user', async () => {
        (axiosConfig.get as jest.Mock).mockResolvedValue({ data: mockProductListFull });
        const result = await productService.getLatestProductListForUser(mockUserName);
        expect(result).toEqual(mockProductListFull);
        expect(axiosConfig.get).toHaveBeenCalledWith(`productLists/latest/${mockUserName}`);
    });

    it('should get products for list', async () => {
        (axiosConfig.get as jest.Mock).mockResolvedValue({ data: mockProducts });
        const result = await productService.getProductsForList(mockListId);
        expect(result).toEqual(mockProducts);
        expect(axiosConfig.get).toHaveBeenCalledWith(`products/productList/${mockListId}`);
    });

    it('should get product list lazy', async () => {
        (axiosConfig.get as jest.Mock).mockResolvedValue({ data: mockProductListLazy });
        const result = await productService.getProductListLazy(mockListId);
        expect(result).toEqual(mockProductListLazy);
        expect(axiosConfig.get).toHaveBeenCalledWith(`productLists/${mockListId}`);
    });

    it('should create a list', async () => {
        (axiosConfig.post as jest.Mock).mockResolvedValue({ data: mockProductListFull });
        const result = await productService.createList(mockProductListFull);
        expect(result).toEqual(mockProductListFull);
        expect(axiosConfig.post).toHaveBeenCalledWith('users/addProductList', mockProductListFull);
    });

    it('should update a list', async () => {
        (axiosConfig.put as jest.Mock).mockResolvedValue({ data: mockProductListFull });
        const result = await productService.updateList(mockProductListFull);
        expect(result).toEqual(mockProductListFull);
        expect(axiosConfig.put).toHaveBeenCalledWith('users/updateProductList', mockProductListFull);
    });

    it('should delete a product', async () => {
        (axiosConfig.delete as jest.Mock).mockResolvedValue({ data: {} });
        const result = await productService.deleteProduct(mockProductId);
        expect(result).toEqual({});
        expect(axiosConfig.delete).toHaveBeenCalledWith(`products/${mockProductId}`);
    });

    it('should delete a list', async () => {
        (axiosConfig.delete as jest.Mock).mockResolvedValue({ data: {} });
        const result = await productService.deleteList(mockListId);
        expect(result).toEqual({});
        expect(axiosConfig.delete).toHaveBeenCalledWith(`productLists/delete/${mockListId}`);
    });

    it('should share a list', async () => {
        (axiosConfig.put as jest.Mock).mockResolvedValue({ data: {} });
        const result = await productService.shareList(mockListId, mockUserGroupId);
        expect(result).toEqual({});
        expect(axiosConfig.put).toHaveBeenCalledWith(`productLists/shareListWithGroup/${mockListId}`, mockUserGroupId, {
            headers: {
                'Content-Type': 'text/plain',
            },
        });
    });

    it('should unshare a list', async () => {
        (axiosConfig.put as jest.Mock).mockResolvedValue({ data: {} });
        const result = await productService.unshareList(mockListId);
        expect(result).toEqual({});
        expect(axiosConfig.put).toHaveBeenCalledWith(`productLists/unshareListWithGroup/${mockListId}`);
    });
});
