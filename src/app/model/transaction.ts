import * as moment from 'moment';
import { Utility } from '../common/utility';

export class Transaction {
  id: number;
  category: string;
  subCategory: string;
  amount: number;
  date: Date;
  comment: string;
  createdDate: Date;
  
  constructor(){
    this.date = new Date();
  }

  public clone(){
    return new (<any>this.constructor)
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
  
  static create(category, subCategory, date, amount) : Transaction{
      var t = new Transaction();
      t.category = category;
      t.subCategory = subCategory;
      t.date = date;
      t.amount = amount;
      t.createdDate = new Date();
      return t;
  }

  static createEmpty(): Transaction{
    var t = new Transaction();
    t.createdDate = new Date();
    return t;
  }
}