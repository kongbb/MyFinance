import { InMemoryDbService } from "angular2-in-memory-web-api";
export class StockTradingData implements InMemoryDbService {
  createDb() {
    let trades = [
      { code: "LPE", tradeDate: "21/01/2016", buySell: "B", units: 60606, price: 0.033, brokerage: 19.95, netAmount: 2019.95},
      { code: "CAT", tradeDate: "22/01/2016", buySell: "B", units: 60606, price: 2, brokerage: 19.95, netAmount: 4019.95},
      { code: "LPE", tradeDate: "17/02/2016", buySell: "B", units: 66667, price: 0.03, brokerage: 19.95, netAmount: 2019.96},
      { code: "LPE", tradeDate: "18/02/2016", buySell: "S", units: 66667, price: 0.033, brokerage: 19.95, netAmount: 2180.06}
    ];
    return { trades };
  }
}

