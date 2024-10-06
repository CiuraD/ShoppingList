import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Product} from './interfaces/product.interface'
import {ProductListLazy} from './interfaces/productListLazy.interface';
import {ProductListFull} from './interfaces/productListFull.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
  ) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.api}/api/products`);
  }

  getProductListsForUser(userName: string): Observable<ProductListLazy[]> {
    return this.http.get<ProductListLazy[]>(`${environment.api}/api/users/productLists/${userName}`);
  }

  getProductsForList(listId: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.api}/api/products/productList/${listId}`);
  }

  saveList(list: ProductListFull): Observable<ProductListFull> {
    console.log(list);
    return this.http.post<ProductListFull>(`${environment.api}/api/users/addProductList`, list);
  }
}
