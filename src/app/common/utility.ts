import * as moment from 'moment';

export class Utility {
  static getQuarterNumber(date: Date) : number{
      var d = moment(date);
      return d.year() * 4 + d.quarter();
  }
  
  static getQuarterString(date: Date) : string{
      var d = moment(date);
      var y = d.year();
      var q = d.quarter();
      if(q <= 2){
          return (y - 1) + "-" + y + " Q" + (q + 2);
      }
      else{
          return y + "-" + (y + 1) + " Q" + (q - 2);
      }
  }

  static getQuarterStringFromQuarterNumber(n: number) : string{
      var q = n % 4;
      var y = Math.floor(n / 4);
      if(q == 0){
          q = 4;
          y = y - 1;
      }
      
      if(q <= 2){
          return (y - 1) + "-" + y + " Q" + (q + 2);
      }
      else{
          return y + "-" + (y + 1) + " Q" + (q - 2);
      }
  }
  
  static getYearNumber(date: Date) : number{
      var d = moment(date);
      var y = d.year();
      var q = d.quarter();
      if(q <= 2){
          return y - 1;
      }
      else{
          return y;
      }
  }

  static getYearString(date: Date) : string{
      var d = moment(date);
      var y = d.year();
      var q = d.quarter();
      if(q <= 2){
          return (y - 1) + "-" + y;
      }
      else{
          return y + "-" + (y + 1);
      }
  }

  static getYearStringFromYearNumber(y: number) : string{
      return y + "-" + (y + 1);
  }

  static toString(date: Date): string{
      return moment(date).format("YYYY-MM-DD")
  }

  static getToday(): Date{
      var d = new Date();
      d.setHours(0, 0, 0, 0);
      return d;
  }

  static createAlert(type, message, timeout) : any {
      var to = 5000;
      if(timeout){
          to = timeout;
      }
      return {
            type: type, //valid value are "info", "success", "warning", "danger"
            msg: message,
            timeout: timeout
    };
  }
}