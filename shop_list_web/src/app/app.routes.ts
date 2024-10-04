import {Routes} from '@angular/router';
import {AuthGuard} from './services/auth/auth-guard.service';
import {LoginComponent} from './components/login/login.component';
import {TestComponent} from './components/test/test.component';
import {RegistrationComponent} from './components/registration/registration.component';

export const routes: Routes = [
    
    {
        path: 'home',
        component: TestComponent,
        canActivate: [AuthGuard],
        data: {icon:'home', showNav: true, showInNav: true, title: 'Home'},
    },
    {
        path: 'products',
        component: TestComponent,
        canActivate: [AuthGuard],
        data: {icon:'inventory', showNav: true, showInNav: true, title: 'Inventory'},
    },
    {
        path: 'login',
        component: LoginComponent,
        data: {icon:'login', showNav: false, showInNav: false, title: 'Login'},
    },
    {
        path: 'register',
        component: RegistrationComponent,
        data: {icon:'login', showNav: false, showInNav: false, title: 'Register'},
    },
    {
        path: '**',
        redirectTo: 'login',
    }
    
];
