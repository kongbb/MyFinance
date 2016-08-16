import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "../component/home.component";
import { SignupComponent } from "../component/signup.component";
import { LoginComponent } from "../component/login.component";

const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: "signup", component: SignupComponent},
  { path: "login", component: LoginComponent}
];

export const appRoutingProviders: any[] = [
];

export const routing = RouterModule.forRoot(routes);