import { Component, OnInit } from "@angular/core";
import { StockTrade } from "../model/stock-trade";
import { StockStore } from "../dataStores/stock.store";

@Component({
    selector: "stocks",
    //template: "<h1>Hello Home</h1>"
    templateUrl: "../../pages/template/stocks.html",
    providers: [StockStore]
})

export class StocksComponent implements OnInit{
    errorMessage: string;
    // variable for what needs to be displayed in the table
    protected columns: string[];

    // variable for what needs to be displayed in the table column header
    protected titles: string[];
    
    constructor (private store: StockStore) {}

    ngOnInit() {
        this.columns = ["code", "tradeDate", "price", "units", "netAmount", "cost", "profit"];
        this.titles = ["Code", "Date", "Sold Price", "Units", "Sold Amount", "Cost", "Profit"];
    }
}
