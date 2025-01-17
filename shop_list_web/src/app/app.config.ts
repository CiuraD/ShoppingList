import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}, provideAnimationsAsync('noop'), provideAnimationsAsync()
  ]
};
