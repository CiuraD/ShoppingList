import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from '../../aa';

@Component({
    selector: 'test',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './test.component.html',
    styleUrl: './test.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestComponent {
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
