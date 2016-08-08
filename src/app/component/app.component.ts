import { Component } from "@angular/core";
import { ROUTER_DIRECTIVES, Router, RouterOutlet, RouterLink } from "@angular/router";
import { HTTP_PROVIDERS } from "@angular/http";

@Component({
    selector: "myfinance",
    templateUrl: `<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES],
    providers: [Router]
})

export class AppComponent {
  constructor(router: Router){}
}