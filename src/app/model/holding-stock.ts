export class HoldingStock {
  code: string;
  units: number;
  price: number;
  amount: number;
  profit: number;
  currentPrice: number;
  currentMarketValue: number;
  
  constructor(){
  }
  
  static create(code, units, price, amount) : HoldingStock{
      var t = new HoldingStock();
      t.code = code;
      t.units = units;
      t.price = price;
      t.amount = amount;
      return t;
  }
}