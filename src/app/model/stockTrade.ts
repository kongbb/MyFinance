export class StockTrading {
  constructor(
    public code: string,
    public tradeDate: Date,
    public buySell: string,
    public units: number,
    public price: number,
    public brokerage: number,
    public netAmount: number
  ) { }
}