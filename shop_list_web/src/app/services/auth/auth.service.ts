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
    
    const body = { username, password };
    return this.http.post<any>(`${environment.api}/api/users/login`, body).pipe(
        tap((response: any) => {
            const access_token = response.token;
            this.localStorageService.setString(LocalStorageService.TOKEN_KEY, access_token);
            this.localStorageService.setString(LocalStorageService.USERNAME, username);
        }),
        switchMap(() => of(null))
    )
  }

  register(username: string, email: string, password: string): Observable<any> {
    const body = { username, email, password };
    return this.http.post<any>(`${environment.api}/api/users/register`, body);
  }

  logout() {
    this.localStorageService.unset(LocalStorageService.TOKEN_KEY);
    this.localStorageService.unset(LocalStorageService.USERNAME);
}
}