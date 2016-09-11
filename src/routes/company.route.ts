import express = require('express');
import bodyParser = require('body-parser');
import * as moment from 'moment';
var db = require('../mongodb/db');
var CompanyTransaction = require('../models/company-transaction.model');

export class CompanyRoute{
    
    public getTransactions(req: express.Request, res: express.Response, next: express.NextFunction){
        CompanyTransaction.find().sort({date: -1})
        .lean().exec().then(function(trans){
            res.json(trans);
        });
    }

    public postTransaction(req: express.Request, res: express.Response, next: express.NextFunction) {
        //create transaction
        var ct = new CompanyTransaction({
            date: req.body.date,
            amount: req.body.amount,
            comment: req.body.comment,
            category: req.body.category,
            createdDate: Date.now()
        });

        if(req.body.gst != null && req.body.gst != ""){
            ct.gst = req.body.gst;
        }
        if(req.body.subCategory != null && req.body.subCategory != ""){
            ct.subCategory = req.body.subCategory;
        }
                
        // save the transaction and check for errors
        ct.save().then(function(){
            res.json({
                id:  ct._id.toString(),
                //date: moment(ct.date).format('YYYY-MM-DD'),
                date: ct.date,
                amount: ct.amount,
                gst: ct.gst,
                category: ct.category,
                subCategory: ct.subCategory,
                comment: ct.comment,
                createdDate: ct.createdDate
            });
        }); 
    } 
}

var jsonParser = bodyParser.json();
var router = express.Router();

router.route('/categories')
    .get(function(req, res){
        CompanyTransaction.aggregate([
            {
                $group: {
                    _id: { 
                        category: "$category",
                        subCategory: "$subCategory", 
                        isIncome: { $cond: { if: { $gt: ["$amount", 0]}, then: true, else: false } },
                    },
                    averageAmount: { $avg: "$amount" },
                    count: { $sum: 1 }
                }
            },
            {
                $group: {
                    _id: { category: "$_id.category", isIncome: "$_id.isIncome" },
                    subCategories:{
                        $push: {
                            isIncome: "$_id.isIncome",
                            name: "$_id.subCategory",
                            averageAmount: "$averageAmount",
                            count: "$count"
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    name: "$_id.category",
                    isIncome: "$_id.isIncome",
                    subCategories: 1,
                }
            }
        ]).exec()
        .then(function(results){
            var cs = results.map(function(item){
                var c = item;
                if (c.subCategories && c.subCategories.length == 1) {
                    if (!c.subCategories[0].name) {
                        c.averageAmount = c.subCategories[0].averageAmount;
                        c.count = c.subCategories[0].count;
                        c.subCategories = null;
                    }
                }
                return c;
            });
            res.send(cs);
        })
        .catch(function(err){
            res.send(err);
        });
    });

router.route('/categories/:category')
    .put(function(req, res){
        //update categories
    });
var cr = new CompanyRoute();
router.route('/transactions')
    .get(cr.getTransactions.bind(cr.getTransactions))
    .post(jsonParser, cr.postTransaction.bind(cr.postTransaction));

router.route('/transactions/:transaction_id')
    .put(function(req, res){
        //update transaction   
    })
    .get(function(req, res){
        //return transaction
        CompanyTransaction.findById(req.params.transaction_id).exec()
            .then(function(tran) {
                res.json(tran);
            });
    })
    .delete(function(req, res){
        //delete transaction
        CompanyTransaction.remove({_id: req.params.transaction_id}).exec().then(function(err, tran){
                if(err){
                    res.send(err);
                }
                res.json({ message: 'Successfully deleted' });
        });
    });
    
module.exports = router;