import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/RX';
import { StockTrade, TradingSummary } from '../model/stock-trade';
import { StockService } from '../service/stock.service';

@Injectable()
export class StockStore {
    private _soldTransactions : BehaviorSubject<List<StockTrade>> 
        = new BehaviorSubject(List([]));
    private _holdingStocks : BehaviorSubject<List<StockTrade>> 
        = new BehaviorSubject(List([]));
    private _profit: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    
    constructor(private service: StockService){
        this.loadInitialData();
    }
    
    get soldTransactions(){
        return new Observable(fn => this._soldTransactions.subscribe(fn));
    }
    
    get getHoldingStocks(){
        return new Observable(fn => this._holdingStocks.subscribe(fn));
    }

    get profit(){
        return new Observable(fn => this._profit.subscribe(fn));
    }

    loadInitialData(){
        this.service.getTrades()
            .subscribe(
                res => {
                    let summary = <TradingSummary>res.json();
                    this._soldTransactions.next(List(summary.soldTrades));
                    this._holdingStocks.next(List(summary.holdingStocks));
                    this._profit.next(summary.profit);
                },
                err => {
                    console.log("Error retrieving stock trades!")
                }
            );
    }

    sortByDate(a: StockTrade, b: StockTrade){
        // if(a.date > b.date){
        //     return -1;
        // }
        // else{
        //     return 1;
        // }
        return 1;
    }
}