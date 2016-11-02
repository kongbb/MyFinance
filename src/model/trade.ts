export class Trade {
  code: string;
  confirmationNumber: string;
  orderNumber: string;
  buySell: string;
  units: number;
  price: number;
  brokerage: number;
  netAmount: number;
  tradeDate: Date;
  settlementDate: Date;
  confirmationStatus: string;
  soldUnits: number;

  constructor(){
  }
  
  static create(code, orderNumber, buySell, units, price, brokerage, netAmount, tradeDate) : Trade{
      var t = new Trade();
      t.code = code;
      t.orderNumber = orderNumber;
      t.buySell = buySell;
      t.units = units;
      t.price = price;
      t.brokerage = brokerage;
      t.netAmount = netAmount;
      t.tradeDate = tradeDate;
      t.soldUnits = 0;
      return t;
  }

  static create2(code, orderNumber, buySell, units, price, brokerage, netAmount, tradeDate, confirmationNumber, confirmationStatus, settlementDate) : Trade{
      var t = new Trade();
      t.code = code;
      t.orderNumber = orderNumber;
      t.buySell = buySell;
      t.units = units;
      t.price = price;
      t.brokerage = brokerage;
      t.netAmount = netAmount;
      t.tradeDate = tradeDate;
      t.soldUnits = 0;
      t.confirmationNumber = confirmationNumber;
      t.confirmationStatus = confirmationStatus;
      t.settlementDate = settlementDate;
      return t;
  }
}