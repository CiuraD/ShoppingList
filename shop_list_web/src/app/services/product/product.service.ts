import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Product} from './interfaces/product.interface'
import {ProductList} from './interfaces/productList.interface';

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

  getProductListsForUser(userName: string): Observable<ProductList[]> {
    return this.http.get<ProductList[]>(`${environment.api}/api/users/productLists/${userName}`);
  }

  getProductsForList(listId: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.api}/api/products/productList/${listId}`);
  }
}
