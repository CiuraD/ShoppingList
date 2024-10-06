import {Routes} from '@angular/router';
import {AuthGuard} from './services/auth/auth-guard.service';
import {LoginComponent} from './components/login/login.component';
import {TestComponent} from './components/test/test.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {ListsComponent} from './components/lists/lists.component';
import {EditListComponent} from './components/edit-list/edit-list.component';

export const routes: Routes = [
    
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
        path: 'home',
        component: TestComponent,
        canActivate: [AuthGuard],
        data: {icon:'home', showNav: true, showInNav: true, title: 'Home'},
    },
    {
        path: 'lists',
        component: ListsComponent,
        canActivate: [AuthGuard],
        data: {icon:'list', showNav: true, showInNav: true, title: 'Lists'},
    },
    {
        path: 'create/:id',
        component: EditListComponent,
        canActivate: [AuthGuard],
        data: {icon:'edit_note', showNav: true, showInNav: true, title: 'Create List'},
    },
    {
        path: '**',
        redirectTo: 'login',
    }
    
];
