import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "../component/home.component";
import { SignupComponent } from "../component/signup.component";
import { LoginComponent } from "../component/login.component";

const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: "signup", component: SignupComponent},
  { path: "login", component: LoginComponent},
  // { path: "finance", component: FinanceComponent }
  //TODO this is for lazyload { path: "finance", loadChildren: "../module/finance.module" }
];

export const appRoutingProviders: any[] = [
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);