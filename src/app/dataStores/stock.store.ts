import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { List } from "immutable";
import { BehaviorSubject } from "rxjs/RX";
import { SoldTrade } from "../model/stock-trade";
import { HoldingStock } from "../model/holding-stock";
import { StockService } from "../service/stock.service";

@Injectable()
export class StockStore {
    private _soldTransactions : BehaviorSubject<List<SoldTrade>> 
        = new BehaviorSubject(List([]));
    private _holdingStocks : BehaviorSubject<List<HoldingStock>> 
        = new BehaviorSubject(List([]));
    private _profit: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    private _holdingProfit: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    
    constructor(private service: StockService){
        this.loadInitialData();
    }
    
    get soldTransactions(){
        return new Observable(fn => this._soldTransactions.subscribe(fn));
    }
    
    get holdingStocks(){
        return new Observable(fn => this._holdingStocks.subscribe(fn));
    }

    get profit(){
        return new Observable(fn => this._profit.subscribe(fn));
    }

    get holdingProfit(){
        return new Observable(fn => this._holdingProfit.subscribe(fn));
    }

    loadInitialData(){
        this.service.getTrades()
            .subscribe(
                res => {
                    let soldTrades = <SoldTrade[]>res.json();
                    this._soldTransactions.next(List(soldTrades));
                    this._profit.next(soldTrades.reduce(function(a: number, b: SoldTrade){return a + b.profit}, 0));
                },
                err => {
                    console.log("Error retrieving stock trades!")
                }
            );

        this.service.getHoldingStocks()
            .subscribe(
                res => {
                    let holdingStocks = <HoldingStock[]>res.json();
                    this._holdingStocks.next(List(holdingStocks));
                    this.getCurrentMarketValue();
                },
                err => {
                    console.log("Error retrieving stock trades!")
                }
            );
    }

    getCurrentMarketValue(){
        var list = this._holdingStocks.getValue();
        list.forEach(stock => {
            this.service.getQuote(stock.code)
                .subscribe(
                        res => {
                            var quote = <Object>res.json();
                            stock.currentPrice = quote.quote.price;
                            stock.currentMarketValue = stock.units * stock.currentPrice;
                            stock.profit = stock.currentMarketValue - stock.amount;
                        }
                );
        });
        this._holdingStocks.next(list);
        this._holdingProfit.next(list.reduce(function(a: number, b: HoldingStock){return a + b.profit}, 0));
    }
}