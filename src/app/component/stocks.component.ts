import { Component, OnInit } from "@angular/core";
import { SoldTrade } from "../model/stock-trade";
import { StockService } from "../service/stock.service";
import { StockStore } from "../dataStores/stock.store";

@Component({
    selector: "stocks",
    //template: "<h1>Hello Home</h1>"
    templateUrl: "../../pages/template/stocks.html",
    providers: [StockStore, StockService]
})

export class StocksComponent implements OnInit{
    errorMessage: string;
    // variable for what needs to be displayed in the table
    protected columns: string[];

    // variable for what needs to be displayed in the table column header
    protected titles: string[];

    // variable for what needs to be displayed in the table
    protected holdingColumns: string[];

    // variable for what needs to be displayed in the table column header
    protected holdingTitles: string[];
    
    constructor (private store: StockStore) {}

    ngOnInit() {
        this.columns = ["code", "tradeDate", "soldPrice", "units", "soldAmount", "purchaseAmount", "profit"];
        this.titles = ["Code", "Date", "Sold Price", "Units", "Sold Amount", "Purchase Amount", "Profit"];

        this.holdingColumns = ["code", "units", "averagePrice", "currentPrice", "netAmount", "marketValue", "profit"];
        this.holdingTitles = ["Code", "Units", "Purchase Price", "Current Price", "Net Amount", "Current Market Value", "Profit"];
    }
}
