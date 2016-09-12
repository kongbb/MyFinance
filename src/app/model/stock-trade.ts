export class StockTrade {
  code: string;
  tradeDate: Date;
  buySell: string;
  units: number;
  price: number;
  brokerage: number;
  netAmount: number;
  profit: number;
  relatedTrades: any[];
  cost: number;
  soldUnits: number;

  constructor(){
  }
  
  static create(code, tradeDate, buySell, units, price, brokerage, netAmount, profit, relatedTrades, cost, soldUnits) : StockTrade{
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

export class TradingSummary{
  profit: number;
  soldTrades: StockTrade[];
  holdingStocks: StockTrade[];
}