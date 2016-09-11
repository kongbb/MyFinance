import { Transaction } from './transaction';

export class HomeTransaction extends Transaction{
  constructor(){
    super();
  }

  static createHomeTransaction(id, category, subCategory, date, amount, comment, createdDate) : HomeTransaction{
      var t = new HomeTransaction();
      t.id = id;
      t.category = category;
      t.subCategory = subCategory;
      t.date = date;
      t.amount = amount;
      t.comment = comment;
      t.createdDate = createdDate;
      return t;
  }

  static createEmptyHomeTransaction(): HomeTransaction{
    var t = new HomeTransaction();
    t.date = new Date();
    return t;
  }
}