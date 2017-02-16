import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule, JsonpModule } from "@angular/http";
import { ModalModule } from "ng2-bootstrap";
//import { InMemoryBackendService, SEED_DATA } from "angular2-in-memory-web-api";
// import { InMemoryWebApiModule } from "angular2-in-memory-web-api";
// modules
import { SharedModule } from "./module/shared.module";
import { FinanceModule } from "./module/finance.module";

// components
import { AppComponent } from "./component/app.component";
import { HomeComponent } from "./component/home.component";
import { SignupComponent } from "./component/signup.component";
import { LoginComponent } from "./component/login.component";

// service
import { UserService } from "./service/user.service";
import { UserStore } from "./dataStores/user.store";
import { GoogleApiHelper } from "./common/gapi";

// route
import { routing, appRoutingProviders } from "./route/app.router";

// mock data
// import { UserData } from "./mockData/user.data";
// TODO try lazy load module later
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule,
    JsonpModule,
    // InMemoryWebApiModule.forRoot(UserData),
    SharedModule,
    FinanceModule,
  ],
  declarations: [
    AppComponent,
    //components
    HomeComponent,
    LoginComponent,
    SignupComponent
  ],
  providers: [
    appRoutingProviders,
    UserService,
    UserStore,
    GoogleApiHelper
    //{ provide: XHRBackend, useClass: InMemoryBackendService }, // in-mem server
    //{ provide: SEED_DATA, useClass: UserData }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }