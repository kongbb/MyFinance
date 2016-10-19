import { Component, NgModule } from '@angular/core';
import { NavigationComponent } from './navigation.component';

@NgModule({
  declarations: [
    NavigationComponent
  ]
})
@Component({
    selector: 'finance',
    template: `<navigation></navigation>
               <div id="page-wrapper"><router-outlet ></router-outlet></div>`
})

export class FinanceComponent {
    
}