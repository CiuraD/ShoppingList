import { Routes, CanActivate } from '@angular/router';
import {AppComponent} from './app.component';
import {AuthGuard} from './services/auth/auth-guard.service';
import {LoginComponent} from './components/login/login.component';
import {TestComponent} from './components/test/test.component';

export const routes: Routes = [
    
    {
        path: 'aaa',
        component: TestComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: '**',
        redirectTo: 'login',
    }
    
];
