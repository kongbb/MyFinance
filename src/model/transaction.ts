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
  createdDate: Date

  constructor(id: string, userId: string, transactionType: string, date: Date, 
    amount: number, gst: number, category: string, 
    subCategory: string, comment: string, createdDate: Date){
      this.id = id;
      this.userId = userId;
      this.transactionType = transactionType;
      this.date = date;
      this.amount = amount;
      this.gst = gst;
      this.category = category;
      this.subCategory = subCategory;
      this.comment = comment;
      this.createdDate = createdDate;
  }    
}