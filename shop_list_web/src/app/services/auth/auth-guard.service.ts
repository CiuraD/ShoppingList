import {inject, Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {LocalStorageService} from "../local-storage/loacal-storage.service";
import { JwtHelperService } from '@auth0/angular-jwt';

const jwtHelper = new JwtHelperService();

@Injectable({ providedIn: 'root' })
class AuthGuardService {
    constructor(
        private readonly router: Router,
        private readonly localStorageService: LocalStorageService,
    ) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const savedToken = this.localStorageService.getString(LocalStorageService.TOKEN_KEY);

        if (!savedToken || jwtHelper.isTokenExpired(savedToken)) {
            console.log('Token expired or not found');
            this.localStorageService.unset(LocalStorageService.TOKEN_KEY);
            return this.router.parseUrl('/login');
        }

        return true;
    }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(AuthGuardService).canActivate(next, state);
}