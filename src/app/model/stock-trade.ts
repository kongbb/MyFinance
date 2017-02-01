export class StockTrade {
  code: string;
  units: number;
  price: number;
  netAmount: number;
  tradeDate: Date;
  
  constructor(){
  }
  
  static create(code, units, soldPrice, soldAmount, purchaseAmount, tradeDate) : StockTrade{
      var t = new StockTrade();
      t.code = code;
      t.units = units;
      t.price = soldPrice;
      t.netAmount = soldAmount;
      t.tradeDate = tradeDate;
      return t;
  }
}