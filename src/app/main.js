"use strict";
const platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
const app_router_1 = require("./route/app.router");
const app_component_1 = require("./component/app.component");
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [app_router_1.appRouterProviders]);
