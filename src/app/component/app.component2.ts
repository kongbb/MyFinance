import { Component, NgModule } from '@angular/core';
import { NavigationComponent } from './navigation.component';
import { CompanyTransactionsComponent } from './company-transactions.component';
import { HomeTransactionsComponent } from './home-transactions.component';

@NgModule({
  declarations: [
    NavigationComponent,
    CompanyTransactionsComponent,
    HomeTransactionsComponent
  ]
})
@Component({
    selector: 'my-finance',
    template: `<navigation (navigation)="showPage($event)"></navigation>
               <company-transactions [hidden]="currentPage != 'company'"></company-transactions>
               <home-transactions [hidden]="currentPage != 'home'"></home-transactions>`
})

export class AppComponent {
    title = 'My Finance';
    private currentPage: string = "company";
    
    showPage(results: string){
        this.currentPage = results;
    }
}