import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/RX';
import { CompanyTransaction } from '../model/company-transaction';
import { Category } from '../model/category';
import { CompanyService } from '../service/company.service';

@Injectable()
export class CompanyStore {
    private _transactions : BehaviorSubject<List<CompanyTransaction>> 
        = new BehaviorSubject(List([]));
    private _categories : BehaviorSubject<List<Category>> 
        = new BehaviorSubject(List([]));
    private _balance: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    
    constructor(private service: CompanyService){
        this.loadInitialData();
    }
    
    get transactions(){
        return new Observable(fn => this._transactions.subscribe(fn));
    }
    
    get categories(){
        return new Observable(fn => this._categories.subscribe(fn));
    }

    get balance(){
        return new Observable(fn => this._balance.subscribe(fn));
    }

    loadInitialData(){
        this.service.getTransactions()
            .subscribe(
                res => {
                    let ts = (<Object[]>res.json()).map((t: any) =>
                    CompanyTransaction.createCompanyTransaction(t._id, t.category, t.subCategory, t.date, t.amount, t.gst, t.comment, t.createdDate));
                    this._transactions.next(List(ts));
                    this._balance.next(ts.reduce(function(a, b){return a + b.amount}, 0));
                },
                err => {
                    console.log("Error retrieving company transactions!")
                }
            );
        
        this.service.getCategories()
            .subscribe(
                res => {
                    let cs = (<Object[]>res.json()).map((c: any) =>{
                        var t = Category.create(c.name, c.isIncome, null, c.count, c.averageAmount);
                        if(c.subCategories && c.subCategories.length > 0){
                            t.subCategories = c.subCategories.map((s: any) =>
                                Category.create(s.name, s.isIncome, null, s.count, s.averageAmount));
                        }
                        return t;
                    });
                    this._categories.next(List(cs));
                },
                err => {
                    console.log("Error retrieving company categories");
                }
            );
    }

    addTransaction(tran: CompanyTransaction){
        this.service.save(tran)
            .subscribe(
                res => {
                    this._transactions.next(this._transactions.getValue().push(tran).sort(this.sortByDate).toList());
                    this._balance.next(this._balance.getValue() + tran.amount);
                },
                err => {
                    console.log("Error saving company categories");
                }
            );
        return this.transactions;
    }

    deleteTransaction(tran: CompanyTransaction){
        this.service.delete(tran)
            .subscribe(
                res => {
                    this._transactions.next(this._transactions.getValue().remove(this._transactions.getValue().indexOf(tran)))
                    this._balance.next(this._balance.getValue() - tran.amount);
                },
                err => {
                    console.log("Error deleting company categories");
                }
            );
        return this.transactions;
    }

    sortByDate(a: CompanyTransaction, b: CompanyTransaction){
        if(a.date > b.date){
            return -1;
        }
        else{
            return 1;
        }

    }
}