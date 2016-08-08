import { provideRouter, RouterConfig } from '@angular/router';
import { HomeComponent } from '../component/home.component';
import { SignupComponent } from '../component/signup.component';
import { LoginComponent } from '../component/login.component';

const routes: RouterConfig = [
  { path: "", component: HomeComponent},
  { path: "signup", component: SignupComponent},
  { path: "login", component: LoginComponent}
];

export const appRouterProviders = [
  provideRouter(routes)
];