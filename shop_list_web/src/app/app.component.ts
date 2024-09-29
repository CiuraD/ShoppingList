import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./aa";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(
    // private http: HttpClient,
    private apiService: ApiService,
  ) {
  }

  title = 'shop_list_web';
  textFromApi = 'nie działa';

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log('hello');
    this.hello().subscribe(data => {
      console.log(data);
      this.textFromApi = data.message;
    });
  }

  hello(): Observable<any> {
    return this.apiService.hello();
  }
}
