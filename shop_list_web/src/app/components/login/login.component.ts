import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {FormsModule} from '@angular/forms';
import {LocalStorageService} from '../../services/local-storage/loacal-storage.service';

@Component({
    selector: 'login',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
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
    ) {}

    ngOnInit() {
        if (this.localStorageService.isTokenSet()) {
            this.router.navigate(['/home']);
        }
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

