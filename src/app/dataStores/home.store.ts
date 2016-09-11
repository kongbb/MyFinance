import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/RX';
import { HomeTransaction } from '../model/home-transaction';
import { Category } from '../model/category';
import { HomeService } from '../service/home.service';

@Injectable()
export class HomeStore {
    private _transactions : BehaviorSubject<List<HomeTransaction>> 
        = new BehaviorSubject(List([]));
    private _categories : BehaviorSubject<List<Category>> 
        = new BehaviorSubject(List([]));
    private _balance: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    
    constructor(private service: HomeService){
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
                    HomeTransaction.createHomeTransaction(t._id, t.category, t.subCategory, t.date, t.amount, t.comment, t.createdDate));
                    this._transactions.next(List(ts));
                    this._balance.next(ts.reduce(function(a, b){return a + b.amount}, 0));
                },
                err => {
                    console.log("Error retrieving home transactions!")
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
                    console.log("Error retrieving home categories");
                }
            );
    }

    addTransaction(tran: HomeTransaction){
        this.service.save(tran)
            .subscribe(
                res => {
                    this._transactions.next(this._transactions.getValue().push(tran).sort(this.sortByDate).toList());
                    this._balance.next(this._balance.getValue() + tran.amount);
                },
                err => {
                    console.log("Error saving home categories");
                }
            );
        return this.transactions;
    }

    deleteTransaction(tran: HomeTransaction){
        this.service.delete(tran)
            .subscribe(
                res => {
                    this._transactions.next(this._transactions.getValue().remove(this._transactions.getValue().indexOf(tran)))
                    this._balance.next(this._balance.getValue() - tran.amount);
                },
                err => {
                    console.log("Error deleting home categories");
                }
            );
        return this.transactions;
    }

    sortByDate(a: HomeTransaction, b: HomeTransaction){
        if(a.date > b.date){
            return -1;
        }
        else{
            return 1;
        }

    }
}