import { Transaction } from './transaction';
import * as moment from 'moment';

export class CompanyTransaction extends Transaction{
  gst: number;
  
  constructor(){
    super();
  }
  
  get displayCategory(): string{
    return this.subCategory == null ? this.category : this.category + "-" + this.subCategory;
  }
  
  static createCompanyTransaction(id, category, subCategory, date, amount, gst, comment, createdDate) : CompanyTransaction{
      var t = new CompanyTransaction();
      t.id = id;
      t.category = category;
      t.subCategory = subCategory;
      t.date = date;
      t.amount = amount;
      t.gst = gst;
      t.comment = comment;
      t.createdDate = createdDate;
      return t;
  }

  static createEmptyCompanyTransaction(): CompanyTransaction{
    var t = new CompanyTransaction();
    t.date = new Date();
    return t;
  }
}