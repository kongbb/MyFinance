import * as moment from 'moment';
var Promise = require("bluebird");
Promise.promisifyAll(require("mongoose"));
import { Transaction } from "../model/transaction";
var TransactionDB = require('../mongoModel/transaction.model');

export class TransactionRepository{
  public getTransactions(userId: string, transactionType: string): any{
    return TransactionDB.find({userId: userId, transactionType: transactionType})
      .sort({date: -1}).lean().exec().then(function(trans){
            return Promise.map(trans, (t)=> {
              return new Transaction(t.id, t.userId, t.transactionType, t.date, t.amount, 
                t.gst, t.category, t.subCategory, t.comment, t.createdDate);
            });
        });
  }

  public postTransaction(tran: Transaction): any{
    //create transaction
    var t = new TransactionDB({
      userId: tran.userId,
      transactionType: tran.transactionType,
      date: tran.date,
      amount: tran.amount,
      gst: tran.gst,
      comment: tran.comment,
      category: tran.category,
      createdDate: Date.now()
    });

    if(tran.subCategory != null && tran.subCategory != ""){
      t.subCategory = tran.subCategory;
    }

    return t.save();
  }

  public getCategories(userId: string, transactionType: string): any{
    return TransactionDB.aggregate([
      {
        $match: {
          $and: 
            [
              { "userId": { $eq: userId },},
              { "transactionType": { $eq: transactionType }}
            ]
        }
      },
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
    .then(function(cs){
      return Promise.map(cs, (c)=> {
        if (c.subCategories && c.subCategories.length == 1) {
            if (!c.subCategories[0].name) {
                c.averageAmount = c.subCategories[0].averageAmount;
                c.count = c.subCategories[0].count;
                c.subCategories = null;
            }
        }
        return c;
      });
    });
  }

  public getTransactionById(id: string): any{
    return TransactionDB.findById(id).exec();
  }

  public deleteTransaction(id: string): any{
    return TransactionDB.remove({_id:id}).exec();
  }
}