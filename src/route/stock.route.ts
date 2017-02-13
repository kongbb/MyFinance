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
      res.status(200).json({success: 1});
    }).catch((err) => {
      res.status(400).json(err);
    });
  }
}