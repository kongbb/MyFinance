import { StockTrade } from "./stock-trade";

export class SoldTrade extends StockTrade {
  profit: number;
  purchasePrice: number;
  matchedBuyTrades: Array<StockTrade>
  
  constructor(trade: StockTrade){
    super(trade);
    this.profit = 0;
    this.purchasePrice = 0;
    this.matchedBuyTrades = new Array<StockTrade>();
  }
}