"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const navigation_component_1 = require('./navigation.component');
const company_transactions_component_1 = require('./company-transactions.component');
const home_transactions_component_1 = require('./home-transactions.component');
let AppComponent = class AppComponent {
    constructor() {
        this.title = 'My Finance';
        this.currentPage = "company";
    }
    showPage(results) {
        this.currentPage = results;
    }
};
AppComponent = __decorate([
    core_1.NgModule({
        declarations: [
            navigation_component_1.NavigationComponent,
            company_transactions_component_1.CompanyTransactionsComponent,
            home_transactions_component_1.HomeTransactionsComponent
        ]
    }),
    core_1.Component({
        selector: 'my-finance',
        template: `<navigation (navigation)="showPage($event)"></navigation>
               <company-transactions [hidden]="currentPage != 'company'"></company-transactions>
               <home-transactions [hidden]="currentPage != 'home'"></home-transactions>`
    }), 
    __metadata('design:paramtypes', [])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component2.js.map