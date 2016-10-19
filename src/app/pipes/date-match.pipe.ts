import { Pipe, PipeTransform } from '@angular/core';
import { Transaction } from '../model/transaction';
import { Utility } from '../common/utility';

@Pipe({
    name: 'dateMatch',
    pure: false
})

export class DateMatchTransactionPipe implements PipeTransform{
    transform(value, number, quarter, year){
        if(value == null){
            return null;
        }
        
        return value.filter(t => {
            return this.match(number, t, quarter, year);
        })
    }
    
    match(number: number, transaction: Transaction, quarter: number, year: number) : boolean{
        if(number == 1){
            return Utility.getQuarterNumber(transaction.date) == quarter;
        }
        if(number == 2){
            return Utility.getYearNumber(transaction.date) == year;
        }
        if(number == 3){
            return true;
        }
        throw new Error('invalid match number');
    }
}