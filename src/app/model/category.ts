import { Transaction } from "./transaction";
export class Category {
  name: string;
  isIncome: boolean;
  subCategories: Category[];
  
  count: number;
  averageAmount: number;
  rank: number;
  
  constructor(){
  }
  
  static create(name, isIncome = null, subCategories = null, count = null, averageAmount = null) : Category{
      var c = new Category();
      c.name = name;
      if(isIncome != null){
        c.isIncome = isIncome;
      }
      if(subCategories != null){
        c.subCategories = subCategories;
      }
      if(count != null){
        c.count = count;
      }
      if(averageAmount != null){
        c.averageAmount = averageAmount;
      }
      return c;
  }

  static fromTransaction(tran: Transaction): Category{
    var c = new Category();
    c.averageAmount = tran.amount;
    c.count = 1;
    c.isIncome = tran.amount > 0;
    c.name = tran.category;
    if(tran.subCategory != null){
      var s = new Category();
      s.name = tran.subCategory;
      s.averageAmount = tran.amount;
      s.count = 1;
      s.isIncome = c.isIncome;
      c.subCategories = [s];
    }

    return c;
  }
}