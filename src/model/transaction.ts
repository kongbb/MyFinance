var TransactionDB = require('../mongoModel/transaction.model');

export class Transaction {
  id: string;
  userId: string;
  transactionType: string;
  date: Date;
  amount: number;
  gst: number;
  category: string;
  subCategory: string;
  comment: string;
  updatedDate: Date

  constructor(id: string, userId: string, transactionType: string, date: Date,
    amount: number, gst: number, category: string,
    subCategory: string, comment: string, updatedDate: Date) {
    if (id) {
      this.id = id;
    }
    this.userId = userId;
    this.transactionType = transactionType;
    this.date = date;
    this.amount = amount;
    this.gst = gst;
    this.category = category;
    this.subCategory = subCategory;
    this.comment = comment;
    this.updatedDate = updatedDate;
  }
}