import { Observable } from 'rxjs/Observable';
import { Category } from '../model/Category';
import { List } from 'immutable';
import { Transaction } from '../model/Transaction';

export interface ITransactionsService {
    getCategories(type: string);
    
    getTransactions(type: string);
    
    save(trancation : Transaction);
}