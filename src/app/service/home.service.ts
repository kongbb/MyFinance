import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import { ITransactionsService } from './iservice';
import { Category } from '../models/category';
import { HomeTransaction } from '../models/home-transaction';
import { HomeTransactions } from './mock-data';
import { HomeCategories } from './mock-data';

@Injectable()
export class HomeService implements ITransactionsService{
    constructor(protected http: Http){}

    getTransactions(){
        return this.http.get('/home/transactions');
    }
    
    getCategories(){
        return this.http.get('/home/categories');
    }
    
    save(transaction: HomeTransaction){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        return this.http.post('/home/transactions', JSON.stringify(transaction),{headers}).share();
    }

    delete(transaction: HomeTransaction){
        return this.http.delete('/home/transactions/' + transaction.id);
    }

    private transformHomeTransaction(tran: HomeTransaction){
        return {
            Category: tran.category,
            SubCategory: tran.subCategory,
            Date: tran.date,
            Amount: tran.amount,
            Comment: tran.comment,
            CreatedDate: tran.createdDate
        };
    }
}