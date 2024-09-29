
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import {Observable} from 'rxjs';
import {TestService} from '../../services/test/test.service';

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
        private cdr: ChangeDetectorRef,
        private apiService: TestService,
      ) {
      }
    
      title = 'shop_list_web';
      textFromApi = 'nie działa';
    
      ngOnInit(): void {
        this.hello().subscribe(data => {
          console.log(data);
          console.log(data.message);
          this.textFromApi = data.message;
          console.log(this.textFromApi);
          this.cdr.markForCheck();
        });
      }
    
      hello(): Observable<any> {
        return this.apiService.hello();
      }
}
