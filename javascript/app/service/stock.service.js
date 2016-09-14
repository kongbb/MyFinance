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
const http_1 = require("@angular/http");
const Observable_1 = require("rxjs/Observable");
let StockService = class StockService {
    constructor(http) {
        this.http = http;
        this.soldTradesUrl = "api/stocks/soldtrades";
        this.holdingStocksUrl = "api/stocks/holdingstocks";
        this.stockQuoteUrl = "http://quoteapi.com/api/v4/symbols/{code}.asx?appID=af5f4d73c1a54a33&averages=1&desc=1&fundamentals=1&liveness=delayed";
    }
    getTrades() {
        return this.http.get(this.soldTradesUrl);
    }
    getHoldingStocks() {
        return this.http.get(this.holdingStocksUrl);
    }
    getQuote(code) {
        var url = this.stockQuoteUrl.replace("{code}", code);
        return this.http.get(url);
    }
    extractTradesData(res) {
        let body = res.json();
        return body.data || {};
    }
    handleError(error) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : "Server error";
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    }
};
StockService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http])
], StockService);
exports.StockService = StockService;
//# sourceMappingURL=stock.service.js.map