import {HttpClientModule} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import {filter} from 'rxjs';
import {AuthService} from './services/auth/auth.service';
import {JwtModule} from '@auth0/angular-jwt';
import {TestService} from './services/test/test.service';
import {ProductService} from './services/product/product.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {routes} from './app.routes';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    JwtModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
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

  showNav: boolean = true;
  icon: string = '';
  title: string = '';
  navTable: any = [];

  constructor(
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private authService: AuthService,
  ) {}

  ngOnInit() {
    this.createNavTable();
    this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
        const routeData = this.activatedRoute.firstChild?.snapshot.data;
        if (routeData) {
            this.showNav = routeData['showNav'] !== false;
            this.icon = routeData['icon'] || '';
            this.title = routeData['title'] || '';
        }
    });
  }

  logout() {
    this.authService.logout();
    this.navigateTo('login');
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
  
  private createNavTable() {
    routes.forEach(route => {
      if (route.data && route.data['showInNav']) {
          this.navTable.push({
            path: route.path,
            title: route.data['title'],
            icon: route.data['icon'],
          });
      }
    });
    console.log(this.navTable, routes);
  }
}
