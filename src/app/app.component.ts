import { Component } from '@angular/core';

@Component({
  selector: 'af-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'fintech';
}
