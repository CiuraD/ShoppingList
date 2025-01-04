import { AuthService } from './../services/auth/auth.service';
import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {LocalStorageService} from "../services/local-storage/loacal-storage.service";
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';

const jwtHelper = new JwtHelperService();

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private readonly localStorageService: LocalStorageService,
        private readonly router: Router,
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.localStorageService.getString(LocalStorageService.TOKEN_KEY);

        if (token) {
            if (jwtHelper.isTokenExpired(token)) {
                this.localStorageService.unset(LocalStorageService.TOKEN_KEY);
                this.router.navigate(['/login']);
                return throwError('Token expired');
            }
            req = req.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
            });
        }
        console.log('Request:', req);
        return next.handle(req);
    }
}