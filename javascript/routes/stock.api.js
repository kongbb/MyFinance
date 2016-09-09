"use strict";
const express_1 = require("express");
class StockRouter {
    constructor() {
        this.router = express_1.Router();
        this.router.get("/", this.getStockTrades);
    }
    getRouter() {
        return this.router;
    }
    getStockTrades(req, res, next) {
        let trades = [
            { code: "LPE", tradeDate: "42390", buySell: "B", units: 60606, price: 0.033, brokerage: 19.95, netAmount: 2019.95 },
            { code: "CAT", tradeDate: "42391", buySell: "B", units: 2000, price: 2, brokerage: 19.95, netAmount: 4019.95 },
            { code: "LPE", tradeDate: "42417", buySell: "B", units: 66667, price: 0.03, brokerage: 19.95, netAmount: 2019.96 },
            { code: "ALL", tradeDate: "42418", buySell: "B", units: 300, price: 9.78, brokerage: 19.95, netAmount: 2953.95 },
            { code: "LPE", tradeDate: "42418", buySell: "S", units: 66667, price: 0.033, brokerage: 19.95, netAmount: 2180.06 },
            { code: "CAT", tradeDate: "42425", buySell: "S", units: 2000, price: 2.38, brokerage: 19.95, netAmount: 4740.05 },
            { code: "BBUS", tradeDate: "42425", buySell: "B", units: 300, price: 13.46, brokerage: 19.95, netAmount: 4057.95 },
            { code: "LPE", tradeDate: "42425", buySell: "B", units: 66667, price: 0.03, brokerage: 19.95, netAmount: 2019.96 },
            { code: "ALL", tradeDate: "42425", buySell: "S", units: 300, price: 10.01, brokerage: 19.95, netAmount: 2983.05 },
            { code: "LPE", tradeDate: "42430", buySell: "S", units: 66667, price: 0.033, brokerage: 19.95, netAmount: 2180.06 },
            { code: "LPE", tradeDate: "42432", buySell: "B", units: 133334, price: 0.03, brokerage: 19.95, netAmount: 4019.97 },
            { code: "BAP", tradeDate: "42439", buySell: "B", units: 1000, price: 4.52, brokerage: 19.95, netAmount: 4539.95 },
            { code: "LPE", tradeDate: "42451", buySell: "S", units: 66667, price: 0.035, brokerage: 19.95, netAmount: 2313.4 },
            { code: "SMN", tradeDate: "42458", buySell: "B", units: 2000, price: 1.49, brokerage: 19.95, netAmount: 2999.95 },
            { code: "MTR", tradeDate: "42458", buySell: "B", units: 500, price: 4.5, brokerage: 19.95, netAmount: 2269.95 },
            { code: "SMN", tradeDate: "42464", buySell: "S", units: 2000, price: 1.705, brokerage: 19.95, netAmount: 3390.05 },
            { code: "MOY", tradeDate: "42465", buySell: "B", units: 30000, price: 0.12, brokerage: 19.95, netAmount: 3619.95 },
            { code: "BUD", tradeDate: "42471", buySell: "B", units: 20000, price: 0.14, brokerage: 19.95, netAmount: 2819.95 },
            { code: "BAP", tradeDate: "42479", buySell: "S", units: 1000, price: 4.85, brokerage: 19.95, netAmount: 4830.05 },
            { code: "SMN", tradeDate: "42481", buySell: "B", units: 1500, price: 2.13, brokerage: 19.95, netAmount: 3214.95 },
            { code: "SMN", tradeDate: "42488", buySell: "S", units: 1500, price: 2.4, brokerage: 19.95, netAmount: 3580.05 },
            { code: "TAS", tradeDate: "42488", buySell: "B", units: 30000, price: 0.16, brokerage: 19.95, netAmount: 4819.95 },
            { code: "AIA", tradeDate: "42495", buySell: "B", units: 1500, price: 5.87, brokerage: 19.95, netAmount: 8824.95 },
            { code: "ALL", tradeDate: "42502", buySell: "B", units: 1000, price: 11.53, brokerage: 29.95, netAmount: 11559.95 },
            { code: "LPE", tradeDate: "42502", buySell: "S", units: 66667, price: 0.038, brokerage: 19.95, netAmount: 2513.4 },
            { code: "ALL", tradeDate: "42503", buySell: "S", units: 1000, price: 12.335, brokerage: 29.95, netAmount: 12305.05 },
            { code: "TPM", tradeDate: "42506", buySell: "B", units: 500, price: 11.65, brokerage: 19.95, netAmount: 5844.95 },
            { code: "HSN", tradeDate: "42506", buySell: "B", units: 2000, price: 3.75, brokerage: 19.95, netAmount: 7519.95 },
            { code: "TPM", tradeDate: "42515", buySell: "S", units: 500, price: 12.275, brokerage: 19.95, netAmount: 6117.55 },
            { code: "HSN", tradeDate: "42521", buySell: "S", units: 2000, price: 3.72, brokerage: 19.95, netAmount: 7420.05 },
            { code: "AIA", tradeDate: "42521", buySell: "S", units: 1500, price: 5.88, brokerage: 19.95, netAmount: 8800.05 },
            { code: "A2M", tradeDate: "42536", buySell: "B", units: 4000, price: 1.71, brokerage: 19.95, netAmount: 6859.95 },
            { code: "TAS", tradeDate: "42542", buySell: "B", units: 30000, price: 0.135, brokerage: 19.95, netAmount: 4069.95 },
            { code: "A2M", tradeDate: "42558", buySell: "S", units: 4000, price: 1.74, brokerage: 19.95, netAmount: 6940.05 },
            { code: "BUD", tradeDate: "42559", buySell: "B", units: 40000, price: 0.13, brokerage: 19.95, netAmount: 5219.95 },
            { code: "MOY", tradeDate: "42563", buySell: "B", units: 20000, price: 0.249, brokerage: 19.95, netAmount: 4994.95 },
            { code: "BUD", tradeDate: "42565", buySell: "B", units: 30000, price: 0.115, brokerage: 19.95, netAmount: 3469.95 },
            { code: "CM8", tradeDate: "42570", buySell: "B", units: 30000, price: 0.155, brokerage: 19.95, netAmount: 4669.95 },
            { code: "LPE", tradeDate: "42576", buySell: "B", units: 62404, price: 0.033, brokerage: 19.95, netAmount: 2079.28 },
            { code: "LPE", tradeDate: "42585", buySell: "S", units: 62404, price: 0.038, brokerage: 19.95, netAmount: 2351.4 },
            { code: "MOY", tradeDate: "42587", buySell: "S", units: 20000, price: 0.29, brokerage: 19.95, netAmount: 5780.05 },
            { code: "MOY", tradeDate: "42591", buySell: "B", units: 20000, price: 0.28, brokerage: 19.95, netAmount: 5619.95 },
            { code: "MOY", tradeDate: "42592", buySell: "S", units: 20000, price: 0.295, brokerage: 19.95, netAmount: 5880.05 },
            { code: "LPE", tradeDate: "42592", buySell: "B", units: 90000, price: 0.033, brokerage: 19.95, netAmount: 2989.95 },
            { code: "BWX", tradeDate: "42598", buySell: "B", units: 1000, price: 4.93, brokerage: 19.95, netAmount: 4949.95 },
            { code: "BUD", tradeDate: "42598", buySell: "S", units: 32438, price: 0.097, brokerage: 19.95, netAmount: 3126.54 },
            { code: "MOY", tradeDate: "42599", buySell: "S", units: 10000, price: 0.37, brokerage: 19.95, netAmount: 3680.05 },
            { code: "BWX", tradeDate: "42599", buySell: "S", units: 1000, price: 4.494, brokerage: 19.95, netAmount: 4474.11 },
            { code: "MTR", tradeDate: "42605", buySell: "S", units: 500, price: 3.19, brokerage: 19.95, netAmount: 1575.05 },
            { code: "MOY", tradeDate: "42605", buySell: "S", units: 20000, price: 0.361, brokerage: 19.95, netAmount: 7202.14 },
            { code: "BUD", tradeDate: "42605", buySell: "S", units: 27562, price: 0.1, brokerage: 19.95, netAmount: 2736.25 },
            { code: "BKL", tradeDate: "42606", buySell: "B", units: 50, price: 131.2, brokerage: 19.95, netAmount: 6579.95 },
            { code: "MIG", tradeDate: "42607", buySell: "B", units: 20000, price: 0.335, brokerage: 19.95, netAmount: 6719.95 },
            { code: "VOC", tradeDate: "42607", buySell: "B", units: 1000, price: 8.16, brokerage: 19.95, netAmount: 8179.95 },
            { code: "TAS", tradeDate: "42620", buySell: "S", units: 30000, price: 0.165, brokerage: 19.95, netAmount: 4930.05 }
        ];
        trades.forEach(function (currentValue, index, arr) {
            if (currentValue.buySell == "B") {
                currentValue.soldUnits = 0;
            }
            else {
                currentValue.relatedTrades = [];
                currentValue.cost = 0;
            }
        });
        var totalProfit = 0;
        for (var i = 0; i < trades.length; i++) {
            var currentValue = trades[i];
            if (currentValue.buySell == "S") {
                var units = currentValue.units;
                var cost = 0;
                for (var index = 0; index < trades.length; index++) {
                    var trade = trades[index];
                    var unsoldUnits = trade.units - trade.soldUnits;
                    if (trade.buySell == "B" && trade.code == currentValue.code && unsoldUnits > 0) {
                        if (unsoldUnits >= units) {
                            trade.soldUnits += units;
                            cost += trade.netAmount * 1.0 * units / trade.units;
                            units = 0;
                        }
                        else {
                            trade.soldUnits = trade.units;
                            units -= unsoldUnits;
                            cost += trade.netAmount * 1.0 * unsoldUnits / trade.units;
                        }
                        currentValue.relatedTrades.push(trade);
                        if (units == 0) {
                            currentValue.cost = cost;
                            currentValue.profit = currentValue.netAmount - cost;
                            totalProfit += currentValue.profit;
                            break;
                        }
                    }
                }
            }
        }
        ;
        var soldTrades = trades.filter(function (trade) {
            return trade.buySell == "S";
        });
        res.json({ profit: totalProfit, soldTrades: soldTrades });
    }
}
exports.StockRouter = StockRouter;
