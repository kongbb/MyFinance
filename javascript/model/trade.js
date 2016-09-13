"use strict";
class Trade {
    constructor() {
    }
    static create(code, orderNumber, buySell, units, price, brokerage, netAmount, tradeDate, soldUnits) {
        var t = new Trade();
        t.code = code;
        t.orderNumber = orderNumber;
        t.buySell = buySell;
        t.units = units;
        t.price = price;
        t.brokerage = brokerage;
        t.netAmount = netAmount;
        t.tradeDate = tradeDate;
        t.soldUnits = soldUnits;
        return t;
    }
}
exports.Trade = Trade;
//# sourceMappingURL=trade.js.map