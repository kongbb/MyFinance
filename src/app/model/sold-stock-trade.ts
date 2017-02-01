import { StockTrade } from './stock-trade';

export class SoldStockTrade extends StockTrade {
  profit: number;
  purchasePrice: number;
  currentPrice: number;
  potentialMarketValue: number;

  constructor(){
    super();
  }
  
  static create(code, units, soldPrice, soldAmount, purchaseAmount, tradeDate) : SoldStockTrade{
      var t = new SoldStockTrade();
      t.code = code;
      t.units = units;
      t.price = soldPrice;
      t.netAmount = soldAmount;
      t.tradeDate = tradeDate;
      t.profit = soldAmount - purchaseAmount;
      t.purchasePrice = purchaseAmount / units;
      return t;
  }
}