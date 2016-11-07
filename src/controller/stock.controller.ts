import * as moment from 'moment';
var fs = require("fs");
var Promise = require("bluebird");
Promise.promisifyAll(fs);
import { StockTrade } from "../model/stock-trade";
import { CommsecCSV } from "../fileHandler/commsecCSV";
import { StockRepository } from "../repository/stock.repository";

export class StockController{

  private fileHandler: CommsecCSV;

  constructor(){
    this.fileHandler = new CommsecCSV();
  }

  importStockTransactions(path: string): Promise<any>{
    return fs.readFileAsync(path, "utf8").then(function(content){
      if(!this.fileHandler.IsValid(content)){
        return Promise.reject(new Error("Invalid Stock CSV format."))
      }
      else{
        var trades = this.fileHandler.extractData(content);
        Promise.resolve({filePath: path, transactionsCount: trades.length});
      }
    });
  }

  uploadStockTransactionsCSV(path: string): Promise<any>{
    return fs.readFileAsync(path, "utf8").then(function(content){
      if(!this.fileHandler.IsValid(content)){
        return Promise.reject(new Error("Invalid Stock CSV format."))
      }
      else{
        var trades = this.fileHandler.extractData(content);
        return new StockRepository().importStockTrades(trades);
      }
    });
  }
}