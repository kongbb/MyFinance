"use strict";
class HoldingStock {
    constructor() {
    }
    static create(code, units, price, amount) {
        var t = new HoldingStock();
        t.code = code;
        t.units = units;
        t.price = price;
        t.amount = amount;
        return t;
    }
}
exports.HoldingStock = HoldingStock;
//# sourceMappingURL=holding-stock.js.map