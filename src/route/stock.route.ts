"use strict";
import { Router, Request, Response } from "express";
import { HoldingStock } from "../model/holding-stock";
import { SoldTrade } from "../model/sold-trade";
import { StockTrade } from "../model/stock-trade";
import { StockController } from "../controller/stock.controller";

var multer = require("multer");
var upload = multer({dest: "upload/"});
var fs = require("fs");
var Promise = require("bluebird");
Promise.promisifyAll(fs);
var request = require("request");
var async = require("async");

export class StockRouter{
  private router: Router;
  private controller: StockController;
  
  constructor(){
    this.router = Router();
    this.controller = new StockController();
    this.router.get("/soldtrades", (req: Request, res: Response) => this.getSoldTrades(req, res));
    this.router.get("/holdingstocks", (req: Request, res: Response) => this.getHoldingStocks(req, res));
    this.router.post("/", upload.single('file'), (req: Request, res: Response) => this.uploadStockTransactionsCSV(req, res));
    this.router.post("/import", (req: Request, res: Response) => this.importStockTransactions(req, res));
  }

  public getRouter(){
    return this.router;
  }

  getSoldTrades(req: Request, res: Response){
    this.controller.getSoldTrades().then((data) => {
      res.status(200).json(data);
    }).catch((err) => {
      res.status(400).json(err);
    });
  }

  getHoldingStocks(req: Request, res: Response){
    this.controller.getHoldingStocks().then((data) => {
      res.status(200).json(data);
    }).catch((err) => {
      res.status(400).json(err);
    });
  }

  uploadStockTransactionsCSV(req: Request, res: Response){
    this.controller.uploadStockTransactionsCSV(req.file.path).then((data) => {
      res.status(200).json(data);
    }).catch((err) => {
      res.status(400).json(err);
    });
  }

  importStockTransactions(req: Request, res: Response){
    this.controller.importStockTransactions(req.body.path).then(() => {
      res.status(200);
    }).catch((err) => {
      res.status(400).json(err);
    });
  }
}


// let trades = [
    //   StockTrade.create("LPE", "N82498896", "B", 60606, 0.033, 19.95, 2019.95, "2016-01-21"),
    //   StockTrade.create("CAT", "N82520229", "B", 2000, 2, 19.95, 4019.95, "2016-01-22"),
    //   StockTrade.create("LPE", "N82975171", "B", 66667, 0.03, 19.95, 2019.96, "2016-02-17"),
    //   StockTrade.create("ALL", "N83013303", "B", 300, 9.78, 19.95, 2953.95, "2016-02-18"),
    //   StockTrade.create("LPE", "N82976446", "S", 66667, 0.033, 19.95, 2180.06, "2016-02-18"),
    //   StockTrade.create("CAT", "N83155905", "S", 2000, 2.38, 19.95, 4740.05, "2016-02-25"),
    //   StockTrade.create("BBUS", "N83149790", "B", 300, 13.46, 19.95, 4057.95, "2016-02-25"),
    //   StockTrade.create("LPE", "N83147904", "B", 66667, 0.03, 19.95, 2019.96, "2016-02-25"),
    //   StockTrade.create("ALL", "N83148017", "S", 300, 10.01, 19.95, 2983.05, "2016-02-25"),
    //   StockTrade.create("LPE", "N83154472", "S", 66667, 0.033, 19.95, 2180.06, "2016-03-01"),
    //   StockTrade.create("LPE", "N83257895", "B", 133334, 0.03, 19.95, 4019.97, "2016-03-03"),
    //   StockTrade.create("BAP", "N83447162", "B", 1000, 4.52, 19.95, 4539.95, "2016-03-10"),
    //   StockTrade.create("LPE", "N83457969", "S", 66667, 0.035, 19.95, 2313.4, "2016-03-22"),
    //   StockTrade.create("SMN", "N83685934", "B", 2000, 1.49, 19.95, 2999.95, "2016-03-29"),
    //   StockTrade.create("MTR", "N83708093", "B", 500, 4.5, 19.95, 2269.95, "2016-03-29"),
    //   StockTrade.create("SMN", "N83803978", "S", 2000, 1.705, 19.95, 3390.05, "2016-04-04"),
    //   StockTrade.create("MOY", "N83819722", "B", 30000, 0.12, 19.95, 3619.95, "2016-04-05"),
    //   StockTrade.create("BUD", "N83922745", "B", 20000, 0.14, 19.95, 2819.95, "2016-04-11"),
    //   StockTrade.create("BAP", "N84113062", "S", 1000, 4.85, 19.95, 4830.05, "2016-04-19"),
    //   StockTrade.create("SMN", "N84181171", "B", 1500, 2.13, 19.95, 3214.95, "2016-04-21"),
    //   StockTrade.create("SMN", "N84181320", "S", 1500, 2.4, 19.95, 3580.05, "2016-04-28"),
    //   StockTrade.create("TAS", "N84300647", "B", 30000, 0.16, 19.95, 4819.95, "2016-04-28"),
    //   StockTrade.create("AIA", "N84449847", "B", 1500, 5.87, 19.95, 8824.95, "2016-05-05"),
    //   StockTrade.create("ALL", "N84595262", "B", 1000, 11.53, 29.95, 11559.95, "2016-05-12"),
    //   StockTrade.create("LPE", "N84054932", "S", 66667, 0.038, 19.95, 2513.4, "2016-05-12"),
    //   StockTrade.create("ALL", "N84641598", "S", 1000, 12.335, 29.95, 12305.05, "2016-05-13"),
    //   StockTrade.create("TPM", "N84656205", "B", 500, 11.65, 19.95, 5844.95, "2016-05-16"),
    //   StockTrade.create("HSN", "N84658823", "B", 2000, 3.75, 19.95, 7519.95, "2016-05-16"),
    //   StockTrade.create("TPM", "N84868950", "S", 500, 12.275, 19.95, 6117.55, "2016-05-25"),
    //   StockTrade.create("HSN", "N84981635", "S", 2000, 3.72, 19.95, 7420.05, "2016-05-31"),
    //   StockTrade.create("AIA", "N84981559", "S", 1500, 5.88, 19.95, 8800.05, "2016-05-31"),
    //   StockTrade.create("A2M", "N85284197", "B", 4000, 1.71, 19.95, 6859.95, "2016-06-15"),
    //   StockTrade.create("TAS", "N85369916", "B", 30000, 0.135, 19.95, 4069.95, "2016-06-21"),
    //   StockTrade.create("A2M", "N85768324", "S", 4000, 1.74, 19.95, 6940.05, "2016-07-07"),
    //   StockTrade.create("BUD", "N85798142", "B", 40000, 0.13, 19.95, 5219.95, "2016-07-08"),
    //   StockTrade.create("MOY", "N85879273", "B", 20000, 0.249, 19.95, 4994.95, "2016-07-12"),
    //   StockTrade.create("BUD", "N85917207", "B", 30000, 0.115, 19.95, 3469.95, "2016-07-14"),
    //   StockTrade.create("CM8", "N86008521", "B", 30000, 0.155, 19.95, 4669.95, "2016-07-19"),
    //   StockTrade.create("LPE", "N86135387", "B", 62404, 0.033, 19.95, 2079.28, "2016-07-25"),
    //   StockTrade.create("LPE", "N86178054", "S", 62404, 0.038, 19.95, 2351.4, "2016-08-03"),
    //   StockTrade.create("MOY", "N86370828", "S", 20000, 0.29, 19.95, 5780.05, "2016-08-05"),
    //   StockTrade.create("MOY", "N86427531", "B", 20000, 0.28, 19.95, 5619.95, "2016-08-09"),
    //   StockTrade.create("MOY", "N86427632", "S", 20000, 0.295, 19.95, 5880.05, "2016-08-10"),
    //   StockTrade.create("LPE", "N86387531", "B", 90000, 0.033, 19.95, 2989.95, "2016-08-10"),
    //   StockTrade.create("BWX", "N86575630", "B", 1000, 4.93, 19.95, 4949.95, "2016-08-16"),
    //   StockTrade.create("BUD", "N86577796", "S", 32438, 0.097, 19.95, 3126.54, "2016-08-16"),
    //   StockTrade.create("MOY", "N86609406", "S", 10000, 0.37, 19.95, 3680.05, "2016-08-17"),
    //   StockTrade.create("BWX", "N86575713", "S", 1000, 4.494, 19.95, 4474.11, "2016-08-17"),
    //   StockTrade.create("MTR", "N86733627", "S", 500, 3.19, 19.95, 1575.05, "2016-08-23"),
    //   StockTrade.create("MOY", "N86723867", "S", 20000, 0.361, 19.95, 7202.14, "2016-08-23"),
    //   StockTrade.create("BUD", "N86733729", "S", 27562, 0.1, 19.95, 2736.25, "2016-08-23"),
    //   StockTrade.create("BKL", "N86773279", "B", 50, 131.2, 19.95, 6579.95, "2016-08-24"),
    //   StockTrade.create("MIG", "N86788311", "B", 20000, 0.335, 19.95, 6719.95, "2016-08-25"),
    //   StockTrade.create("VOC", "N86784696", "B", 1000, 8.16, 19.95, 8179.95, "2016-08-25"),
    //   StockTrade.create("TAS", "N86877921", "S", 30000, 0.165, 19.95, 4930.05, "2016-09-07"),
    // ];
    // trades.forEach(function(currentValue, index, arr){
    //   if(currentValue.buySell == "B"){
    //     currentValue.soldUnits = 0;
    //   }
    // });
    // var soldTrades = [];
    // for (var i = 0; i < trades.length; i++){
    //   var sold = trades[i];
    //   if(sold.buySell == "S"){
    //     var units = sold.units;
    //     var purchaseAmount = 0;
    //     for (var index = 0; index < trades.length; index++) {
    //       var buy = trades[index];
    //       var unsoldUnits = buy.units - buy.soldUnits;
    //       if(buy.buySell == "B" && buy.code == sold.code && unsoldUnits > 0){
    //         if(unsoldUnits >= units){
    //           buy.soldUnits += units;
    //           purchaseAmount += buy.netAmount * 1.0 * units / buy.units;
    //           units = 0;
    //         }
    //         else{
    //           buy.soldUnits = buy.units;
    //           units -= unsoldUnits;
    //           purchaseAmount += buy.netAmount * 1.0 * unsoldUnits / buy.units;
    //         }
            
    //         if(units == 0){
    //           soldTrades.push(SoldTrade.create(sold.code, sold.units, sold.price, sold.netAmount, purchaseAmount, sold.tradeDate));
    //           break;
    //         }
    //       }
    //     }
    //   }
    // }
    // res.json(soldTrades);