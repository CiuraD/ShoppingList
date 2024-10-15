import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';

@Component({
    selector: 'registration',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIcon,
        MatFormFieldModule,
    ],
    templateUrl: './registration.component.html',
    styleUrl: './registration.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent implements OnInit {
    errorMessage: string = '';

  constructor(
        private authService: AuthService,
        private router: Router,
        private readonly formBuilder: FormBuilder,
    ) {}

    protected registerForm!: FormGroup;

    ngOnInit() {
        this.createForm();
    }

    private createForm() {
        this.registerForm = this.formBuilder.group({
            username: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onLogin() {
        this.registerForm.reset();
        this.router.navigate(['/login']);
    }

    onRegister() {
        if (this.registerForm.invalid) {
            return;
        }
        this.register();
    }

    async register() {
        const {username, email, password} = this.registerForm.value;
        this.authService.register(username, email, password).subscribe({
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
