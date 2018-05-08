import { Component, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(public auth: AuthService,
    private cdr: ChangeDetectorRef) { }
  
    ngAfterViewChecked(): void {
      this.cdr.detectChanges();
    }

}
