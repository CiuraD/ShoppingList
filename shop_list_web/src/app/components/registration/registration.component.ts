import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {FormsModule} from '@angular/forms';

@Component({
    selector: 'registration',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
    ],
    templateUrl: './registration.component.html',
    styleUrl: './registration.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent {
    username: string = '';
    email: string = '';
    password: string = '';
    errorMessage: string = '';

  constructor(
        private authService: AuthService,
        private router: Router,
    ) {}

    async register() {
        this.authService.register(this.username, this.email, this.password).subscribe({
            next: response => {
                this.router.navigate(['/login']); // Navigate to the home page or another route
            },
            error: error => {
                // Handle login error
                console.error('Registration failed', error);
                this.errorMessage = 'Invalid credentials';
            }
        });
    }
}
