import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    constructor(
      private http: HttpClient,
    ) {}

    getUserId(username: string): Observable<any> {
        return this.http.get<string>(`${environment.api}/api/users/getUserId/${username}`);
    }
}