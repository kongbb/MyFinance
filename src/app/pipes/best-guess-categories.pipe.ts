import { Pipe, PipeTransform } from '@angular/core';
import { List } from 'immutable';

import { Utility } from '../common/utility';
import { Category } from '../model/category';
import { CompanyTransaction } from '../model/company-transaction';

@Pipe({
    name: 'bestGuessCategories',
    pure: false
})

export class BestGuessCategories implements PipeTransform{
    transform(categories, amount){
        if(categories == null || amount == null || amount == 0){
            return null;
        }
        
        var cs = categories.filter(c => amount > 0 ? c.isIncome : !c.isIncome);
        if(cs.size == 0){
            return null;
        }
        
        cs.forEach(c => {
            this.calculate(c, amount);
        });
        //categories is immutable list, sort doesn't work on that, try orderedMap
        var array = cs.toArray();
        array.sort(this.compareRank);
        return array;
    }
    
    calculate(category: Category, amount: number){
        if(category.subCategories != null){
            var rank = 0;
            category.subCategories.forEach(c => {
                this.calculate(c, amount);
                rank += c.rank;
            });
            category.rank = rank;
            category.subCategories.sort(this.compareRank);
        }
        else{
            var averageAmount = Math.abs(category.averageAmount);
            amount = Math.abs(amount);
            if(amount > averageAmount){
                category.rank = category.count * Math.pow(averageAmount / amount, 2);
            }
            else{
                category.rank = category.count * Math.pow(amount / averageAmount, 2);
            }
        }
    }
    
    compareRank(a: Category, b: Category): number{
        return b.rank - a.rank;
    }
}