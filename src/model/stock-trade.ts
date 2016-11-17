import * as moment from 'moment';

export class StockTrade {
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

  constructor(code: string, orderNumber: string, buySell: string, units: number, price: number, brokerage: number, netAmount: number, tradeDate: string, confirmationNumber: string, confirmationStatus: string, settlementDate: string){
      this.code = code;
      this.orderNumber = orderNumber;
      this.buySell = buySell;
      this.units = units;
      this.price = price;
      this.brokerage = brokerage;
      this.netAmount = netAmount;
      this.tradeDate = new Date(moment(tradeDate, "DD/MM/YYYY"));
      this.soldUnits = 0;
      this.confirmationNumber = confirmationNumber;
      this.confirmationStatus = confirmationStatus;
      this.settlementDate = new Date(moment(settlementDate, "DD/MM/YYYY"));
  }
  
//   static create(code, orderNumber, buySell, units, price, brokerage, netAmount, tradeDate) : StockTrade{
//       var t = new StockTrade();
//       t.code = code;
//       t.orderNumber = orderNumber;
//       t.buySell = buySell;
//       t.units = units;
//       t.price = price;
//       t.brokerage = brokerage;
//       t.netAmount = netAmount;
//       t.tradeDate = tradeDate;
//       t.soldUnits = 0;
//       return t;
//   }

//   static create2(code, orderNumber, buySell, units, price, brokerage, netAmount, tradeDate, confirmationNumber, confirmationStatus, settlementDate) : StockTrade{
//       var t = new StockTrade();
//       t.code = code;
//       t.orderNumber = orderNumber;
//       t.buySell = buySell;
//       t.units = units;
//       t.price = price;
//       t.brokerage = brokerage;
//       t.netAmount = netAmount;
//       t.tradeDate = new Date(moment(tradeDate, "DD/MM/YYYY"));
//       t.soldUnits = 0;
//       t.confirmationNumber = confirmationNumber;
//       t.confirmationStatus = confirmationStatus;
//       t.settlementDate = new Date(moment(settlementDate, "DD/MM/YYYY"));
//       return t;
//   }
}