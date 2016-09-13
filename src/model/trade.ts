export class Trade {
  code: string;
  orderNumber: string;
  buySell: string;
  units: number;
  price: number;
  brokerage: number;
  netAmount: number;
  tradeDate: Date;
  soldUnits: number;

  constructor(){
  }
  
  static create(code, orderNumber, buySell, units, price, brokerage, netAmount, tradeDate, soldUnits) : Trade{
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