import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import { FormsModule, ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import {LocalStorageService} from '../../services/local-storage/loacal-storage.service';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
    selector: 'login',
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
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
username: string = '';
password: string = '';
errorMessage: string = '';

  constructor(
        private authService: AuthService,
        private localStorageService: LocalStorageService,
        private router: Router,
        private readonly formBuilder: FormBuilder,
    ) {}

    protected loginForm!: FormGroup;

    ngOnInit() {
        if (this.localStorageService.isTokenSet()) {
            this.router.navigate(['/home']);
        }

        this.createForm();
    }

    private createForm() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onLogin() {
        if (this.loginForm.invalid) {
            return;
        }

        this.login();
    }

    onRegister() {
        this.loginForm.reset();
        this.router.navigate(['/register']);
    }

    async login() {
        this.authService.login(this.username, this.password).subscribe({
            next: response => {
                this.router.navigate(['/home']); 
            },
            error: error => {
                console.error('Login failed', error);
                this.errorMessage = 'Invalid username or password';
            }
        });
    }
}

