import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import { ITransactionsService } from './iservice';
import { CompanyTransaction } from '../models/company-transaction';
import { Category } from '../models/category';
import { CompanyTransactions } from './mock-data';
import { CompanyCategories } from './mock-data';

@Injectable()
export class CompanyService implements ITransactionsService{

    constructor(protected http: Http){}

    getTransactions(){
        return this.http.get('/company/transactions');
    }
    
    getCategories(){
        return this.http.get('/company/categories');
    }
    
    save(transaction: CompanyTransaction){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        return this.http.post('/company/transactions', JSON.stringify(transaction),{headers}).share();
    }

    delete(transaction: CompanyTransaction){
        // var headers = new Headers();
        // headers.append('Content-Type', 'application/json; charset=utf-8');
        // return this.http.post('/company/transactions', JSON.stringify(transaction),{headers}).share();
        return this.http.delete('/company/transactions/' + transaction.id);
    }

    private transformCompanyTransaction(tran: CompanyTransaction){
        return {
            Category: tran.category,
            SubCategory: tran.subCategory,
            Date: tran.date,
            Amount: tran.amount,
            GST:tran.gst,
            Comment: tran.comment,
            CreatedDate: tran.createdDate
        };
    }
}