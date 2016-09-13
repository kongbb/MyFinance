"use strict";
class SoldTrade {
    constructor() {
    }
    static create(code, units, soldPrice, soldAmount, purchaseAmount, tradeDate) {
        var t = new SoldTrade();
        t.code = code;
        t.units = units;
        t.soldPrice = soldPrice;
        t.soldAmount = soldAmount;
        t.purchaseAmount = purchaseAmount;
        t.tradeDate = tradeDate;
        t.profit = soldAmount - purchaseAmount;
        t.purchasePrice = purchaseAmount / units;
        return t;
    }
}
exports.SoldTrade = SoldTrade;
//# sourceMappingURL=sold-trade.js.map