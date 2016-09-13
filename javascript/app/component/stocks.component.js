"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require("@angular/core");
const stock_service_1 = require("../service/stock.service");
const stock_store_1 = require("../dataStores/stock.store");
let StocksComponent = class StocksComponent {
    constructor(store) {
        this.store = store;
    }
    ngOnInit() {
        this.columns = ["code", "tradeDate", "soldPrice", "units", "soldAmount", "purchaseAmount", "profit"];
        this.titles = ["Code", "Date", "Sold Price", "Units", "Sold Amount", "Purchase Amount", "Profit"];
        this.holdingColumns = ["code", "units", "averagePrice", "currentPrice", "netAmount", "marketValue", "profit"];
        this.holdingTitles = ["Code", "Units", "Purchase Price", "Current Price", "Net Amount", "Current Market Value", "Profit"];
    }
};
StocksComponent = __decorate([
    core_1.Component({
        selector: "stocks",
        templateUrl: "../../pages/template/stocks.html",
        providers: [stock_store_1.StockStore, stock_service_1.StockService]
    }), 
    __metadata('design:paramtypes', [stock_store_1.StockStore])
], StocksComponent);
exports.StocksComponent = StocksComponent;
//# sourceMappingURL=stocks.component.js.map