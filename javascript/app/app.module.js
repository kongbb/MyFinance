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
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const forms_1 = require("@angular/forms");
const http_1 = require("@angular/http");
const angular2_in_memory_web_api_1 = require("angular2-in-memory-web-api");
const app_component_1 = require("./component/app.component");
const home_component_1 = require("./component/home.component");
const signup_component_1 = require("./component/signup.component");
const login_component_1 = require("./component/login.component");
const stocks_component_1 = require("./component/stocks.component");
const app_router_1 = require("./route/app.router");
const user_data_1 = require("./mockData/user.data");
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            app_router_1.routing,
            http_1.HttpModule,
            angular2_in_memory_web_api_1.InMemoryWebApiModule.forRoot(user_data_1.UserData)
        ],
        declarations: [
            app_component_1.AppComponent,
            home_component_1.HomeComponent,
            login_component_1.LoginComponent,
            signup_component_1.SignupComponent,
            stocks_component_1.StocksComponent
        ],
        providers: [
            app_router_1.appRoutingProviders,
        ],
        bootstrap: [app_component_1.AppComponent]
    }), 
    __metadata('design:paramtypes', [])
], AppModule);
exports.AppModule = AppModule;
