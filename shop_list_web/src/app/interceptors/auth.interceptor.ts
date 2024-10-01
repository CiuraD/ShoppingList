import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {LocalStorageService} from "../services/local-storage/loacal-storage.service";
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private readonly localStorageService: LocalStorageService,
        private readonly jwtHelper: JwtHelperService,
        private readonly router: Router,
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.localStorageService.getString(LocalStorageService.TOKEN_KEY);

        if (token) {
            if (this.jwtHelper.isTokenExpired(this.localStorageService.getString(LocalStorageService.TOKEN_KEY))) {
                this.localStorageService.unset(LocalStorageService.TOKEN_KEY);
                this.router.parseUrl('/login');
                return next.handle(req);
            }
            req = req.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
            });
        }

        return next.handle(req);
    }
}