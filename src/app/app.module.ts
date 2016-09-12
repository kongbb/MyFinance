import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule, XHRBackend } from "@angular/http";
//import { InMemoryBackendService, SEED_DATA } from "angular2-in-memory-web-api";
import { InMemoryWebApiModule } from "angular2-in-memory-web-api";

// components
import { AppComponent } from "./component/app.component";
import { HomeComponent } from "./component/home.component";
import { SignupComponent } from "./component/signup.component";
import { LoginComponent } from "./component/login.component";
import { StocksComponent } from "./component/stocks.component";
import { Open } from "./component/open.component";
import { Alert } from "./component/alert";
import { DataTable } from "./component/data-table.component";
import { DateInputComponent } from "./component/date-input.component";
import { Categories } from "./component/categories.component";

// pipes
import { DateMatch } from "./pipes/date-match.pipe";
import { MatchTransaction } from "./pipes/match-transaction.pipe";

// 
import { routing, appRoutingProviders } from "./route/app.router";
import { UserData } from "./mockData/user.data";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule,
    InMemoryWebApiModule.forRoot(UserData)
  ],
  declarations: [
    AppComponent,
    //components
    HomeComponent,
    LoginComponent,
    SignupComponent,
    StocksComponent,
    Open,
    Alert,
    DataTable,
    //DateInputComponent,
    //Categories,
    //pipes
    //DateMatch,
    //MatchTransaction
  ],
  providers: [
    appRoutingProviders,
    //HTTP_PROVIDERS
    //{ provide: XHRBackend, useClass: InMemoryBackendService }, // in-mem server
    //{ provide: SEED_DATA, useClass: UserData }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }