export class HoldingStock {
  code: string;
  units: number;
  price: number;
  amount: number;

  constructor(code: string, units: number, price: number, amount: number){
    this.code = code;
    this.units = units;
    this.price = price;
    this.amount = amount;
  }
}