"use strict";
const platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
const http_1 = require("@angular/http");
const login_component_1 = require("./component/login.component");
platform_browser_dynamic_1.bootstrap(login_component_1.LoginComponent, [http_1.HTTP_PROVIDERS]);
