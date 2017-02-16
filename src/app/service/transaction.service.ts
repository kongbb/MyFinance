import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import { ITransactionsService } from './iservice';
import { Transaction } from '../model/transaction';
import { Category } from '../model/category';

@Injectable()
export class TransactionService implements ITransactionsService{

    constructor(protected http: Http){
        
    }

    getTransactions(type: string){
        return this.http.get('/api/transactions/' + type);
    }
    
    getCategories(type: string){
        return this.http.get('/api/transactions/' + type + '/categories');
    }
    
    save(transaction: Transaction){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        return this.http.post('/api/transactions/transaction', JSON.stringify(transaction),{headers}).share();
    }

    delete(transaction: Transaction){
        // var headers = new Headers();
        // headers.append('Content-Type', 'application/json; charset=utf-8');
        // return this.http.post('/company/transactions', JSON.stringify(transaction),{headers}).share();
        return this.http.delete('api/company/transactions/' + transaction.id);
    }
}