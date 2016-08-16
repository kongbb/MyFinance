import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./component/app.component";
import { HomeComponent } from "./component/home.component";
import { SignupComponent } from "./component/signup.component";
import { LoginComponent } from "./component/login.component";
import { routing, appRoutingProviders } from "./route/app.router";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}