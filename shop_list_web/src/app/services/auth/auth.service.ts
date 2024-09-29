import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of, switchMap, tap} from 'rxjs';
import {environment} from '../../environments/environment';
import {LocalStorageService} from '../local-storage/loacal-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
) {}

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = { username, password };
    return this.http.post<any>(`${environment.api}/api/users/login`, body, { headers }).pipe(
        tap((response: any) => {
            console.log('Login successful', response.token);
            const access_token = response.token;
            console.log('Access token:', access_token);

            this.localStorageService.setString(LocalStorageService.TOKEN_KEY, access_token);
        }),
        switchMap(() => of(null))
    )
  }

  logout() {
    this.localStorageService.unset(LocalStorageService.TOKEN_KEY);
}
}