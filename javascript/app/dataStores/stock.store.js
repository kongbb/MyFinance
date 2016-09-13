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
const core_1 = require('@angular/core');
const Observable_1 = require('rxjs/Observable');
const immutable_1 = require('immutable');
const RX_1 = require('rxjs/RX');
const stock_service_1 = require('../service/stock.service');
let StockStore = class StockStore {
    constructor(service) {
        this.service = service;
        this._soldTransactions = new RX_1.BehaviorSubject(immutable_1.List([]));
        this._holdingStocks = new RX_1.BehaviorSubject(immutable_1.List([]));
        this._profit = new RX_1.BehaviorSubject(0);
        this.loadInitialData();
    }
    get soldTransactions() {
        return new Observable_1.Observable(fn => this._soldTransactions.subscribe(fn));
    }
    get getHoldingStocks() {
        return new Observable_1.Observable(fn => this._holdingStocks.subscribe(fn));
    }
    get profit() {
        return new Observable_1.Observable(fn => this._profit.subscribe(fn));
    }
    loadInitialData() {
        this.service.getTrades()
            .subscribe(res => {
            let summary = res.json();
            this._soldTransactions.next(immutable_1.List(summary.soldTrades));
            this._profit.next(summary.profit);
        }, err => {
            console.log("Error retrieving stock trades!");
        });
    }
    sortByDate(a, b) {
        return 1;
    }
};
StockStore = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [stock_service_1.StockService])
], StockStore);
exports.StockStore = StockStore;
//# sourceMappingURL=stock.store.js.map