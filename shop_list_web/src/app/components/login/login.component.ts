import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {FormsModule} from '@angular/forms';

@Component({
    selector: 'login',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
username: string = '';
password: string = '';
errorMessage: string = '';

  constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    async login() {
        this.authService.login(this.username, this.password).subscribe({
            next: response => {
                // Handle successful login
                console.log('Login successful poszlo', response);
                this.router.navigate(['/aaa']); // Navigate to the home page or another route
            },
            error: error => {
                // Handle login error
                console.error('Login failed', error);
                this.errorMessage = 'Invalid username or password';
            }
        });
    }
}

