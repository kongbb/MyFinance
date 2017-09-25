import * as moment from 'moment';

export class StockTrade {
  code: string;
  confirmationNumber: string;
  reference: string;
  orderNumber: string;
  buySell: string;
  units: number;
  price: number;
  brokerage: number;
  netAmount: number;
  tradeDate: Date;
  settlementDate: Date;
  confirmationStatus: string;

  constructor(trade: StockTrade, code?: string, reference?: string, buySell?: string, units?: number, price?: number, 
    brokerage?: number, netAmount?: number, tradeDate?: string, confirmationNumber?: string, 
    confirmationStatus?: string, settlementDate?: string){
      if(trade){
        this.code = trade.code;
        this.reference = trade.reference;
        this.buySell = trade.buySell;
        this.units = trade.units;
        this.price = trade.price;
        this.brokerage = trade.brokerage;
        this.netAmount = trade.netAmount;
        this.tradeDate = trade.tradeDate;
        this.confirmationNumber = trade.confirmationNumber;
        this.confirmationStatus = trade.confirmationStatus;
        this.settlementDate = trade.settlementDate; 
      }
      else{  
        this.code = code;
        this.reference = reference;
        this.buySell = buySell;
        this.units = units;
        this.price = price;
        this.brokerage = brokerage;
        this.netAmount = netAmount;
        this.tradeDate = new Date(moment(tradeDate, "DD/MM/YYYY"));
        this.confirmationNumber = confirmationNumber;
        this.confirmationStatus = confirmationStatus;
        this.settlementDate = new Date(moment(settlementDate, "DD/MM/YYYY"));
      }
  }

  clone(): StockTrade{
    return new StockTrade(null, this.code, this.reference, this.buySell, 
      this.units, this.price, this.brokerage, this.netAmount, moment(this.tradeDate).format("DD/MM/YYYY"), 
      this.confirmationNumber, this.confirmationStatus, moment(this.settlementDate).format("DD/MM/YYYY"));
  }
}