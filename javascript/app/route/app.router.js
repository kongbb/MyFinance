"use strict";
const router_1 = require("@angular/router");
const home_component_1 = require("../component/home.component");
const signup_component_1 = require("../component/signup.component");
const login_component_1 = require("../component/login.component");
const routes = [
    { path: "", component: home_component_1.HomeComponent },
    { path: "signup", component: signup_component_1.SignupComponent },
    { path: "login", component: login_component_1.LoginComponent }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(routes);
