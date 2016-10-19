export class SoldTrade {
  code: string;
  units: number;
  soldPrice: number;
  soldAmount: number;
  purchaseAmount: number;
  tradeDate: Date;
  profit: number;
  purchasePrice: number;
  currentPrice: number;
  potentialMarketValue: number;
  
  constructor(){
  }
  
  static create(code, units, soldPrice, soldAmount, purchaseAmount, tradeDate) : SoldTrade{
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