import { bootstrap } from "@angular/platform-browser-dynamic";
import {HTTP_PROVIDERS} from "@angular/http";

import { appRouterProviders } from "./route/app.router"
import { AppComponent } from "./component/app.component";

bootstrap(AppComponent, [appRouterProviders]);