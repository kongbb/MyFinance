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
}