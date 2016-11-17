import * as moment from 'moment';
var fs = require("fs");
var Promise = require("bluebird");
Promise.promisifyAll(fs);
import { StockTrade } from "../model/stock-trade";
import { HoldingStock } from "../model/holding-stock";
import { CommsecCSV } from "../fileHandler/commsecCSV";
import { StockRepository } from "../repository/stock.repository";

export class StockController{

  private fileHandler: CommsecCSV;
  private repository: StockRepository;

  constructor(){
    this.fileHandler = new CommsecCSV();
    this.repository = new StockRepository();
  }

  importStockTransactions(path: string): Promise<any>{
    return fs.readFileAsync(path, "utf8").bind(this).then(function(content){
      if(!this.fileHandler.IsValid(content)){
        return Promise.reject(new Error("Invalid Stock CSV format."))
      }
      else{
        var trades = this.fileHandler.extractData(content);
        return this.repository.importStockTrades(trades);
      }
    });
  }

  uploadStockTransactionsCSV(path: string): Promise<any>{
    return fs.readFileAsync(path, "utf8").bind(this).then(function(content){
      if(!this.fileHandler.IsValid(content)){
        return Promise.reject(new Error("Invalid Stock CSV format."))
      }
      else{
        var trades = this.fileHandler.extractData(content);
        return Promise.resolve({filePath: path, transactionsCount: trades.length});
      }
    });
  }

  getHoldingStocks(): Promise<HoldingStock>{
    return this.repository.getStockTrades().then((trades: Array<StockTrade>) => {
      return this.generateHoldingStocksFromTrades(trades);
    });
  }

  private generateHoldingStocksFromTrades(trades: Array<StockTrade>): Array<HoldingStock>{
    var map = new Map<string, Array<StockTrade>>();
    trades.forEach((trade: StockTrade, index: number, arr: StockTrade[]) => {
      if(!map.has(trade.code)){
        //assuming first entry here is always a buy trade, and the trades are ordered by trade date desc
        map.set(trade.code, Array.of(trade));
      }
      else{
        var array: StockTrade[] = map.get(trade.code);
        if(trade.buySell == "B"){
          array.push(trade);
        }
        else{
          while(trade.units > 0){
            if(array[0].units > trade.units){
              array[0].netAmount = Math.round(array[0].netAmount * (array[0].units - trade.units) / array[0].units * 100) / 100;
              array[0].units -= trade.units;
              trade.units = 0;
            }
            else{
              trade.units -= array[0].units;
              array.shift();
            }
          }
        }
      }
    });
    
    return Array.from(map.values()).map((ts: StockTrade[]) => {
      return this.aggregate(ts);
    }, this);
  }

  private aggregate(trades: StockTrade[]): HoldingStock{
    return trades.reduce((a: HoldingStock, b: StockTrade) => {
      return new HoldingStock(a.code, a.units + b.units, Math.round((a.amount + b.netAmount) / (a.units + b.units) * 1000) / 1000, a.amount + b.netAmount)
    }, new HoldingStock(trades[0].code, 0, 0, 0));
  }

  // trades.forEach(function(currentValue, index, arr){
    //   if(currentValue.buySell == "B"){
    //     currentValue.soldUnits = 0;
    //   }
    // });
    // var soldTrades = new Array();
    // for (var i = 0; i < trades.length; i++){
    //   var sold = trades[i];
    //   if(sold.buySell == "S"){
    //     var units = sold.units;
    //     var purchaseAmount = 0;
    //     for (var index = 0; index < trades.length; index++) {
    //       var buy = trades[index];
    //       var unsoldUnits = buy.units - buy.soldUnits;
    //       if(buy.buySell == "B" && buy.code == sold.code && unsoldUnits > 0){
    //         if(unsoldUnits >= units){
    //           buy.soldUnits += units;
    //           purchaseAmount += buy.netAmount * 1.0 * units / buy.units;
    //           units = 0;
    //         }
    //         else{
    //           buy.soldUnits = buy.units;
    //           units -= unsoldUnits;
    //           purchaseAmount += buy.netAmount * 1.0 * unsoldUnits / buy.units;
    //         }
            
    //         if(units == 0){
    //           soldTrades.push(SoldTrade.create(sold.code, sold.units, sold.price, sold.netAmount, purchaseAmount, sold.tradeDate));
    //           break;
    //         }
    //       }
    //     }
    //   }
    // }
    // var holdingStocks = new Array<HoldingStock>();
    // for (var i = 0; i < trades.length; i++){
    //   if(trades[i].buySell == "S" || (trades[i].buySell == "B" && trades[i].soldUnits == trades[i].units)){
    //     continue;
    //   }
    //   var trade = trades[i];
    //   var existing: HoldingStock = holdingStocks.find(function(t: HoldingStock){
    //     return t.code == trade.code; 
    //   });
    //   if(existing != null){
    //     existing.units += trade.units - trade.soldUnits;
    //     existing.amount += trade.netAmount * (trade.units - trade.soldUnits) / trade.units;
    //     existing.price = existing.amount / existing.units;
    //   }
    //   else{
    //     var holding = HoldingStock.create(trade.code, trade.units - trade.soldUnits, trade.price, trade.netAmount * (trade.units - trade.soldUnits) / trade.units);
    //     holdingStocks.push(holding);
    //   }
    // }
}