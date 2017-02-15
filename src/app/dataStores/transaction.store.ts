import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { List, Iterable } from 'immutable';
import { BehaviorSubject } from 'rxjs/RX';
import { Utility } from "../common/utility";
import Config from "../common/configuration";
import { Transaction } from '../model/transaction';
import { Category } from '../model/category';
import { TransactionService } from '../service/transaction.service';

@Injectable()
export class TransactionStore {
    private _transactions : BehaviorSubject<List<Transaction>> 
        = new BehaviorSubject(List([]));
    private _categories : BehaviorSubject<List<Category>> 
        = new BehaviorSubject(List([]));
    private _balance: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    
    constructor(private service: TransactionService){
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
                    Transaction.createTransaction(t._id, null, null, t.category, t.subCategory, t.date, t.amount, t.gst, t.comment, t.createdDate));
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

    addTransaction(tran: Transaction){
        if(tran.subCategory == Config.NewSubCategory){
            tran.subCategory = null;
        }
        this.service.save(tran)
            .subscribe(
                res => {
                    this._transactions.next(this._transactions.getValue().push(tran).sort(this.sortByDate).toList());
                    this._balance.next(this._balance.getValue() + tran.amount);
                    this.updateCategory(tran);
                },
                err => {
                    console.log("Error saving company categories");
                }
            );
        return this.transactions;
    }

    updateCategory(tran: Transaction){
        //TypeScript doesn't support & operator against Boolean type
        //for now, only add new Category, not updating existing Categories' data
        var c = this._categories.getValue().find(c => {
            return c.name == tran.category && ((c.isIncome && tran.amount > 0) || (!c.isIncome && tran.amount < 0));
        });
        if(c == null){
            c = Category.create(tran.category, tran.amount > 0, null, 1, tran.amount);
            if(tran.subCategory != null){
                var sub = Category.create(tran.subCategory, tran.amount, null, 1, tran.amount);
                c.subCategories = [sub];
            }

            this._categories.next(this._categories.getValue().push(c).toList());
        }
        else if(tran.subCategory != null){
            if(c.subCategories.find(sc => sc.name == tran.subCategory)){
                var sub = Category.create(tran.subCategory, tran.amount, null, 1, tran.amount);
                c.subCategories.push(sub);
            }
        }
    }

    findTransactionByDateAmount(tran: Transaction): Transaction {
        return this._transactions.getValue().find(t => {
            return t.amount == tran.amount && Utility.sameDate(t.date, tran.date);
        });
    }

    compareTransaction(target: Transaction, transaction: Transaction) : boolean{
        return target.amount == transaction.amount && target.date == transaction.date;
    }

    deleteTransaction(tran: Transaction){
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

    sortByDate(a: Transaction, b: Transaction){
        if(a.date > b.date){
            return -1;
        }
        else{
            return 1;
        }

    }
}