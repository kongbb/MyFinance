import { bootstrap } from "@angular/platform-browser-dynamic";

import {HTTP_PROVIDERS} from "@angular/http";

import { LoginComponent } from "./component/login.component";

bootstrap(LoginComponent, [HTTP_PROVIDERS]);