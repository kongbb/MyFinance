import { Component, OnChanges } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/RX";

import { Transactions } from "./transactions";
import { Utility } from "../common/utility";
import { HomeTransaction } from "../model/home-transaction"
import { Category } from "../model/category";
import { DateInputComponent } from "./date-input.component";
import { DataTable } from "./data-table.component";
import { MatchTransaction } from "../pipes/match-transaction.pipe";
import { BestGuessCategories } from "../pipes/best-guess-categories.pipe";
import { HomeStore } from "../dataStores/home.store";
import { DateMatchTransactionPipe } from "../pipes/date-match.pipe";
import { Categories } from "./categories.component";
import { HomeService } from "../service/home.service";

@Component({
    selector: "home-transactions",
    templateUrl: "../../pages/template/home.html",
    providers: [MatchTransaction,  HomeStore, HomeService]
})

export class HomeTransactionsComponent extends Transactions{
    amountControl: FormControl = new FormControl();
    gst: number;
    date: Date = new Date();
        
    setDate(results){
        this.date = results;
    }

    private dateSubject : BehaviorSubject<Date> 
    
    get dateObservable(){
        return new Observable(fn => this.dateSubject.subscribe(fn));
    }
    
    constructor(protected store: HomeStore,
                protected matchTransactionPipe: MatchTransaction) {
        super();
    }
    
    ngOnInit() {
        this.columns = ["displayTransactionDate", "displayCategory", "amount", "comment"];
        this.titles = ["Transaction Date", "Category", "Amount", "Comment"];
    }
    
    initialNewTransaction(){
        this.newTransaction = HomeTransaction.createEmptyHomeTransaction();
    }

    submit(){
        this.newTransaction.date = this.date;
        this.store.addTransaction(<HomeTransaction>this.newTransaction)
            .subscribe(res => {
                    this.initialNewTransaction();
                },
                err => {
                    alert(err);
                }
            );
    }
    
    delete(tran){
        this.store.deleteTransaction(tran)
            .subscribe(
                res => {
                    
                },
                err => {
                    alert(err);
                }
            );
    }

    reset(){
        this.subCategories = [];
        this.initialNewTransaction();
    }
}