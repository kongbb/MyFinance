import { Pipe, PipeTransform } from '@angular/core';
import { List } from 'immutable';
import { Transaction } from '../model/transaction';
import { CompanyTransaction } from '../model/company-transaction';
import { Utility } from '../common/utility';

@Pipe({
    name: 'MatchTransaction',
    pure: false
})

export class MatchTransaction implements PipeTransform{
    transform(value: List<Transaction>, target){
        if(value == null){
            return null;
        }
        
        return value.filter(t => {
            return this.compareTransaction(target, t);
        }).slice(0, 15);
    }
    
    compareTransaction(target: Transaction, transaction: Transaction) : boolean{
        if(target.amount != null && target.amount != 0){
            if(!((target.amount > 0 && transaction.amount > 0) || (target.amount < 0 && transaction.amount < 0))){
                return false;
            }
        }
        
        if(target.category == null){
            return false;
        }

        if(target.category && target.category != transaction.category){
            return false;
        }
        
        if(target.subCategory && target.subCategory != transaction.subCategory){
            return false;
        }
        
        return true;
    }
}