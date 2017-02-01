import * as moment from 'moment';
var fs = require("fs");
var Promise = require("bluebird");
Promise.promisifyAll(fs);
import { StockTrade } from "../model/stock-trade";
import { SoldTrade } from "../model/sold-trade";
import { MatchingBuyTrade } from "../model/matching-buy-trade";
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

  getSoldTrades(): Promise<Array<SoldTrade>>{
    return this.repository.getStockTrades().then((trades: Array<StockTrade>) => {
      return this.generateSoldTrades(trades);
    });
  }

  getHoldingStocks(): Promise<Array<HoldingStock>>{
    return this.repository.getStockTrades().then((trades: Array<StockTrade>) => {
      return this.generateHoldingStocksFromTrades(trades);
    });
  }

  private generateSoldTrades(trades: Array<StockTrade>): Array<SoldTrade>{
    var result = new Array<SoldTrade>();
    // var sellTrades = new Map<string, Array<StockTrade>>();
    var buyTrades = new Map<string, Array<StockTrade>>();
    trades.forEach((trade: StockTrade, index: number, arr: StockTrade[]) => {
      if(!buyTrades.has(trade.code)){
        //assuming first entry here is always a buy trade, and the trades are ordered by trade date desc
        buyTrades.set(trade.code, Array.of(trade));
      }
      else{
        var array: StockTrade[] = buyTrades.get(trade.code);
        if(trade.buySell == "B"){
          array.push(trade);
        }
        else{
          var sold = new SoldTrade(trade);
          result.push(sold);
          var units = trade.units;
          var cost = 0;
          while(units > 0){
            var matchingTrade = new MatchingBuyTrade(array[0].clone());
            if(array[0].units > units){
              cost += Math.round(array[0].netAmount * units / array[0].units * 100) / 100;
              array[0].netAmount = Math.round(array[0].netAmount * (array[0].units - units) / array[0].units * 100) / 100;
              array[0].units -= units;
              matchingTrade.matchingUnits = units;
              units = 0;
            }
            else{
              cost += Math.round(array[0].netAmount * 100) / 100;
              matchingTrade.matchingUnits = array[0].units;
              units -= array[0].units;
              array.shift();
            }
            sold.matchedBuyTrades.push(matchingTrade);
          }
          sold.profit = Math.round((sold.netAmount - cost) * 100) / 100;
          sold.purchasePrice = Math.round(cost / sold.units * 1000) / 1000;
        }
      }
    });
    return result;
  }

  private generateHoldingStocksFromTrades(trades: Array<StockTrade>): Array<HoldingStock>{
    var map = new Map<string, Array<StockTrade>>();
    trades.forEach((trade: StockTrade, index: number, arr: StockTrade[]) => {
      if(!map.has(trade.code)){
        //assuming first entry here is always a buy trade, and the trades are ordered by trade date
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
    
    return Array.from(map.values()).filter(arr => { return arr.length > 0; }).map((ts: StockTrade[]) => {
      return this.aggregateHoldingStocks(ts);
    }, this);
  }

  private aggregateHoldingStocks(trades: StockTrade[]): HoldingStock{
    return trades.reduce((a: HoldingStock, b: StockTrade) => {
      return new HoldingStock(a.code, a.units + b.units, Math.round((a.amount + b.netAmount) / (a.units + b.units) * 1000) / 1000, a.amount + b.netAmount)
    }, new HoldingStock(trades[0].code, 0, 0, 0));
  }
}