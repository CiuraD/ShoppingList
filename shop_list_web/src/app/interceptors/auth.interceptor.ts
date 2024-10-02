import { AuthService } from './../services/auth/auth.service';
import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {LocalStorageService} from "../services/local-storage/loacal-storage.service";
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private readonly localStorageService: LocalStorageService,
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.localStorageService.getString(LocalStorageService.TOKEN_KEY);
        console.log('req - ', req);
        if (token) {
            req = req.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
            });
        }

        console.log('req - ', req);
        return next.handle(req).pipe(
            tap((event: HttpEvent<any>) => {
              // Handle successful responses here if needed
              console.log('Response event - ', event);
            }),
            catchError((error: HttpErrorResponse) => {
              console.log('Error in request - ', error);
              if (error.status === 401) {
                // Handle the expired token case
                console.log('Token expired. Redirecting to login.');
                this.localStorageService.unset(LocalStorageService.TOKEN_KEY);
                // this.router.navigate(['/login']);
              }
              return throwError(error);
            })
          );
    }
}