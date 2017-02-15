import * as moment from 'moment';
import { Utility } from '../common/utility';

export class Transaction {
  id: number;
  userId: string;
  transactionType: string;
  category: string;
  subCategory: string;
  amount: number;
  gst: number;
  date: Date;
  comment: string;
  createdDate: Date;
  
  constructor(){
    this.date = Utility.getToday();
  }
  
  get displayCategory(): string{
    return this.subCategory == null ? this.category : this.category + "-" + this.subCategory;
  }

  get displayTransactionDate(): string{
    return moment(this.date).format('YYYY-MM-DD');
  }
  
  get quarter(): string{
      return Utility.getQuarterString(this.date);
  }

  toString(): string{
    return this.displayTransactionDate + " " + this.displayCategory + " " + this.amount;
  }
  
  static createTransaction(id, userId, transactionType, category, subCategory, date, amount, gst, comment, createdDate) : Transaction{
      var t = new Transaction();
      t.id = id;
      t.userId = userId;
      t.transactionType = transactionType;
      t.category = category;
      t.subCategory = subCategory;
      t.date = date;
      t.amount = amount;
      t.gst = gst;
      t.comment = comment;
      t.createdDate = createdDate;
      return t;
  }
}