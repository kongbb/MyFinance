import { Component } from "@angular/core";
import { StockService } from "../service/stock.service";

@Component({
    selector: "stocks",
    //template: "<h1>Hello Home</h1>"
    templateUrl: "../../pages/template/stocks.html",
    providers: [StockService]
})

export class StocksComponent {
    errorMessage: string;
    
    constructor (private stockService: StockService) {}

    ngOnInit() {
        //this.getUsers();
    }

    getUsers() {
        // this.userService.getUsers()
        //                     .subscribe(
        //                         users => this.users = users,
        //                         error => this.errorMessage = <any>error
        //                     );
    }
}
