"use strict";
class StockTrade {
    constructor() {
    }
    static create(code, tradeDate, buySell, units, price, brokerage, netAmount, profit, relatedTrades, cost, soldUnits) {
        var t = new StockTrade();
        t.code = code;
        t.tradeDate = tradeDate;
        t.buySell = buySell;
        t.units = units;
        t.price = price;
        t.brokerage = brokerage;
        t.netAmount = netAmount;
        t.profit = profit;
        t.relatedTrades = relatedTrades;
        t.cost = cost;
        t.soldUnits = soldUnits;
        return t;
    }
}
exports.StockTrade = StockTrade;
class TradingSummary {
}
exports.TradingSummary = TradingSummary;
