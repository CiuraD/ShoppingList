import {HttpClientModule} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import {filter} from 'rxjs';
import {AuthService} from './services/auth/auth.service';
import {JwtModule} from '@auth0/angular-jwt';
import {TestService} from './services/test/test.service';
import {ProductService} from './services/product/product.service';
import {HeaderComponent} from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    JwtModule,
    HeaderComponent,
  ],
  providers: [
      AuthService,
      TestService,
      ProductService,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  showHeader: boolean = true;
  icon: string = '';
  title: string = '';

  constructor(
      private activatedRoute: ActivatedRoute,
      private router: Router,
  ) {}

  ngOnInit() {
      this.router.events.pipe(
          filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
          const routeData = this.activatedRoute.firstChild?.snapshot.data;
          if (routeData) {
              this.showHeader = routeData['showHeader'] !== false;
              this.icon = routeData['icon'] || '';
              this.title = routeData['title'] || '';
          }
      });
  }
}
