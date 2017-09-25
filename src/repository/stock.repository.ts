import * as moment from 'moment';
var Promise = require("bluebird");
Promise.promisifyAll(require("mongoose"));
import { StockTrade } from "../model/stock-trade";
var StockTradeDB = require('../mongoModel/stock-trade.model');

export class StockRepository{
  public importStockTrades(trades: StockTrade[]): any{
    // unable to create objects by new Model() then save through insertMany() or insert()
    // got Range Error, should be a bug in mongoose
    // if create a single object by new Model(), then save(), it's fine
    var stockTrades = trades.map(function(t: StockTrade){
      return {
        reference: t.reference,
        security: t.code,
        buySell: t.buySell,
        units: t.units,
        price: t.price,
        brokerage: t.brokerage,
        netAmount: t.netAmount,
        tradeDate: t.tradeDate
      };
    });
    
    return Promise.filter(stockTrades,function(trade){
      return StockTradeDB.findOneAsync({reference: trade.reference}).then(function(doc){
        return doc == null;
      });
    }).then(function(trades){
      if(trades.length > 0){
        return StockTradeDB.collection.insert(trades);
      }
      else{
        return Promise.resolve();
      }
    });
  }

  public getStockTrades(){
    return StockTradeDB.find().sort({tradeDate: 1, buySell: 1})
        .lean().exec().then(function(trans){
            return Promise.map(trans, (t)=> {
              return new StockTrade(null, t.security, t.reference, t.buySell, t.units, t.price, t.brokerage, t.netAmount, t.tradeDate, null, null, null);
            });
        });
  }
}