import express = require('express');
var Promise = require("bluebird");
var multer = require("multer");
var upload = multer({dest: "upload/"});
import { Router, Request, Response } from "express";
import { TransactionController } from "../controller/transaction.controller";
import { Transaction } from "../model/transaction";
import bodyParser = require('body-parser');
import * as moment from 'moment';

export class TransactionsRouter{
    
    private router: Router;
    private controller: TransactionController;

    constructor(){
        this.router = Router();
        this.controller = new TransactionController();
        this.router.get("/:type", (req: Request, res: Response) => this.getTransactions(req, res));
        this.router.get("/:type/categories", (req: Request, res: Response) => this.getCategories(req, res));
        this.router.post("/transaction", (req: Request, res: Response) => this.postTransaction(req, res));
        this.router.post("/", upload.single('file'), (req: Request, res: Response) => this.uploadTransactionsCSV(req, res));
        this.router.delete("/:id", (req: Request, res: Response) => this.deleteTransaction(req, res));
    }

    public getRouter(){
        return this.router;
    }

    uploadTransactionsCSV(req: Request, res: Response){
        this.controller.uploadTransactionsCSV(req.file.path).then((data) => {
            res.status(200).json(data);
        }).catch((err) => {
            res.status(400).json(err);
        });
    }

    getTransactions(req: express.Request, res: express.Response){
        var type = req.params.type;
        this.controller.getTransactions("roger", type).then((data) => {
            res.status(200).json(data);
        }).catch((err) => {
            res.status(400).json(err);
        });
    }

    getCategories(req: express.Request, res: express.Response){
        var type = req.params.type;
        this.controller.getCategories("roger", type).then((data) => {
            res.status(200).json(data);
        }).catch((err) => {
            res.status(400).json(err);
        });
    }

    postTransaction(req: express.Request, res: express.Response) {
        //create transaction
        var t = new Transaction(
            null,
            req.body.userId,
            req.body.transactionType,
            new Date(req.body.date),
            req.body.amount,
            req.body.gst,
            req.body.category,
            req.body.subCategory,
            req.body.comment,
            new Date()
        );

        this.controller.saveTransaction(t).then((data) => {
            res.status(200).json(data);
        }).catch((err) => {
            res.status(400).json(err);
        });
    }

    deleteTransaction(req: express.Request, res: express.Response) {
        this.controller.deleteTransaction(req.params.id).then(() => {
            res.status(200).json({message: "delete Successfully"});
        }).catch((err) => {
            res.status(400).json(err);
        })
    }
}

// var jsonParser = bodyParser.json();
// var router = express.Router();

// router.route('/categories')
//     .get(function(req, res){
//         CompanyTransaction.aggregate([
//             {
//                 $group: {
//                     _id: { 
//                         category: "$category",
//                         subCategory: "$subCategory", 
//                         isIncome: { $cond: { if: { $gt: ["$amount", 0]}, then: true, else: false } },
//                     },
//                     averageAmount: { $avg: "$amount" },
//                     count: { $sum: 1 }
//                 }
//             },
//             {
//                 $group: {
//                     _id: { category: "$_id.category", isIncome: "$_id.isIncome" },
//                     subCategories:{
//                         $push: {
//                             isIncome: "$_id.isIncome",
//                             name: "$_id.subCategory",
//                             averageAmount: "$averageAmount",
//                             count: "$count"
//                         }
//                     }
//                 }
//             },
//             {
//                 $project: {
//                     _id: 0,
//                     name: "$_id.category",
//                     isIncome: "$_id.isIncome",
//                     subCategories: 1,
//                 }
//             }
//         ]).exec()
//         .then(function(results){
//             var cs = results.map(function(item){
//                 var c = item;
//                 if (c.subCategories && c.subCategories.length == 1) {
//                     if (!c.subCategories[0].name) {
//                         c.averageAmount = c.subCategories[0].averageAmount;
//                         c.count = c.subCategories[0].count;
//                         c.subCategories = null;
//                     }
//                 }
//                 return c;
//             });
//             res.send(cs);
//         })
//         .catch(function(err){
//             res.send(err);
//         });
//     });

// router.route('/categories/:category')
//     .put(function(req, res){
//         //update categories
//     });
// var cr = new CompanyRoute();
// router.route('/transactions')
//     .get(cr.getTransactions.bind(cr.getTransactions))
//     .post(jsonParser, cr.postTransaction.bind(cr.postTransaction));

// router.route('/transactions/:transaction_id')
//     .put(function(req, res){
//         //update transaction   
//     })
//     .get(function(req, res){
//         //return transaction
//         CompanyTransaction.findById(req.params.transaction_id).exec()
//             .then(function(tran) {
//                 res.json(tran);
//             });
//     })
//     .delete(function(req, res){
//         //delete transaction
//         CompanyTransaction.remove({_id: req.params.transaction_id}).exec().then(function(err, tran){
//                 if(err){
//                     res.send(err);
//                 }
//                 res.json({ message: 'Successfully deleted' });
//         });
//     });