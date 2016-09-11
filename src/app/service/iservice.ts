import { Observable } from 'rxjs/Observable';
import { Category } from '../models/Category';
import { List } from 'immutable';
import { Transaction } from '../models/Transaction';

export interface ITransactionsService {
    getCategories();
    
    getTransactions();
    
    save(trancation : Transaction);
}