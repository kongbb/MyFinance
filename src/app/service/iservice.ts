import { Observable } from 'rxjs/Observable';
import { Category } from '../model/Category';
import { List } from 'immutable';
import { Transaction } from '../model/Transaction';

export interface ITransactionsService {
    getCategories();
    
    getTransactions();
    
    save(trancation : Transaction);
}