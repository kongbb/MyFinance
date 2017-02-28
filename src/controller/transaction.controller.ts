import * as moment from 'moment';
var Promise = require("bluebird");
var fs = require("fs");
Promise.promisifyAll(fs);
import { Transaction } from "../model/transaction";
import { CommbankCSV } from "../fileHandler/commbankCSV";
import { TransactionRepository } from "../repository/transaction.repository";

export class TransactionController{

  private fileHandler: CommbankCSV;
  private repository: TransactionRepository;

  constructor(){
    this.repository = new TransactionRepository();
    this.fileHandler = new CommbankCSV();
  }

  getTransactions(userId: string, transactionType: string): Promise<Array<Transaction>>{
    return this.repository.getTransactions(userId, transactionType);
  }

  getCategories(userId: string, transactionType: string): Promise<Array<any>>{
    return this.repository.getCategories(userId, transactionType);
  }

  saveTransaction(t: Transaction): Promise<Transaction>{
    return this.repository.saveTransaction(t);
  }

  uploadTransactionsCSV(path: string): Promise<any>{
    return fs.readFileAsync(path, "utf8").bind(this).then(function(content){
      if(!this.fileHandler.IsValid(content)){
        return Promise.reject(new Error("Invalid CBA Transactions CSV format."))
      }
      else{
        var trades = this.fileHandler.extractData(content);
        return Promise.resolve(trades);
      }
    });
  }

  deleteTransaction(id: string){
    return this.repository.deleteTransaction(id);
  }
}