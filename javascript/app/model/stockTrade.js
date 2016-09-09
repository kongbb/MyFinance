"use strict";
class StockTrade {
    constructor(code, tradeDate, buySell, units, price, brokerage, netAmount) {
        this.code = code;
        this.tradeDate = tradeDate;
        this.buySell = buySell;
        this.units = units;
        this.price = price;
        this.brokerage = brokerage;
        this.netAmount = netAmount;
    }
}
exports.StockTrade = StockTrade;
