import * as moment from 'moment';
var Promise = require("bluebird");
import { Transaction } from "../model/transaction";
import { TransactionRepository } from "../repository/transaction.repository";

export class TransactionController{

  private repository: TransactionRepository;

  constructor(){
    this.repository = new TransactionRepository();
  }

  getTransactions(userId: string, transactionType: string): Promise<Array<Transaction>>{
    return this.repository.getTransactions(userId, transactionType);
  }

  getCategories(userId: string, transactionType: string): Promise<Array<any>>{
    return this.repository.getCategories(userId, transactionType);
  }
}