import { StockTrade } from "./stock-trade";

export class MatchingBuyTrade extends StockTrade {
  matchingUnits: number;
  
  constructor(trade: StockTrade){
    super(trade);
    this.matchingUnits = 0;
  }
}