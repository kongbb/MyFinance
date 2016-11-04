import * as moment from 'moment';
var Promise = require("bluebird");
import { StockTrade } from "../model/stock-trade";
var StockTradeDB = require('../mongoModel/stock-trade.model');

export class StockRepository{
  public importStockTrades(trades: StockTrade[]): any{
    var stockTrades = trades.map(function(t: StockTrade){
      return {
        confirmationNumber: t.confirmationNumber,
        orderNumber: t.orderNumber,
        buySell: t.buySell,
        units: t.units,
        price: t.price,
        brokerage: t.brokerage,
        netAmount: t.netAmount,
        tradeDate: t.tradeDate,
        settlementDate: t.settlementDate,
        confirmationStatus: t.confirmationStatus
      };
    });
    Promise.map(valuesToBeFiltered, function(value, index, length) {
      return Promise.all([filterer(value, index, length), value]);
    }).then(function(values) {
      return values.filter(function(stuff) {
          return stuff[0] == true
      }).map(function(stuff) {
          return stuff[1];
      });
    });
    Promise.filter(stockTrades,function(trade){return true;}).then(function(){});
    // unable to create objects by new Model() then save through insertMany() or insert()
    // got Range Error, should be a bug in mongoose
    // if create a single object by new Model(), then save(), it's fine
    return StockTradeDB.collection.insert(stockTrades);
  }

  // private isExisting(trade: StockTrade): boolean{
  //   StockTradeDB.find({confirmationNumber: trade.confirmationNumber}).lean().exec().then(function(arr){
  //     return arr.length == 1;
  //   });
  // }

  public getHoldingStock(){

  }

  public getSoldTrades(){

  }
}