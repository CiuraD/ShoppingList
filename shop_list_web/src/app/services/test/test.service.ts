import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  constructor(
    private http: HttpClient
  ) {}

  hello() {
    return this.http.get('http://localhost:8484/hello');
  }
}
