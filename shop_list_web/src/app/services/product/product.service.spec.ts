import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { environment } from '../../environments/environment';
import { ProductListFull } from './interfaces/productListFull.interface';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should update a product list', () => {
    const mockProductList: ProductListFull = { id: '1', name: 'Updated List', products: [] };

    service.updateList(mockProductList).subscribe(updatedList => {
      expect(updatedList).toEqual(mockProductList);
    });

    const req = httpMock.expectOne(`${environment.api}/api/users/updateProductList`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockProductList);
  });

  it('should delete a product', () => {
    const productId = '1';

    service.deleteProduct(productId).subscribe(response => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne(`${environment.api}/api/products/${productId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should delete a product list', () => {
    const listId = '1';

    service.deleteList(listId).subscribe(response => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne(`${environment.api}/api/productLists/delete/${listId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should share a product list with a group', () => {
    const listId = '1';
    const userGroupId = 'group1';

    service.shareList(listId, userGroupId).subscribe(response => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne(`${environment.api}/api/productLists/shareListWithGroup/${listId}`);
    expect(req.request.method).toBe('PUT');
    req.flush({});
  });

  it('should unshare a product list with a group', () => {
    const listId = '1';

    service.unshareList(listId).subscribe(response => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne(`${environment.api}/api/productLists/unshareListWithGroup/${listId}`);
    expect(req.request.method).toBe('PUT');
    req.flush({});
  });
});