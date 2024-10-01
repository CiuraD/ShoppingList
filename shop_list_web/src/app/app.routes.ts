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
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegistrationComponent,
    },
    {
        path: '**',
        redirectTo: 'login',
    }
    
];
