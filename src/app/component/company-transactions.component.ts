import { Component, OnChanges } from '@angular/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { FormControl } from "@angular/forms";
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/RX';

import { Transactions } from './transactions';
import { Utility } from '../common/utility';
import { CompanyTransaction } from '../model/company-transaction'
import { Category } from '../model/category';
import { DateInputComponent } from './date-input.component';
import { DataTable } from './data-table.component';
import { MatchTransaction } from '../pipes/match-transaction.pipe';
import { BestGuessCategories } from '../pipes/best-guess-categories.pipe';
import { CompanyStore } from '../dataStores/company.store';
import { DateMatch } from '../pipes/date-match.pipe';
import { Categories } from './categories.component';
import { CompanyService } from '../service/company.service';

@Component({
    selector: 'company-transactions',
    template: `
    <div id="wrapper">
        <div id="page-wrapper">
                <div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">Bonheur Station Pty Ltd  <small>{{ store.balance | async | currency:'AUD'}}</small></h1>
                    </div>
                    <!-- /.col-lg-12 -->
                </div>
                <!-- /.row -->
                <div class="row">
                    <div class="col-lg-12">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                New Transaction
                            </div>
                            <div class="panel-body">
                                <div class="row">
                                    <div class="col-lg-6">
                                        <form role="form"  #transactionForm="ngForm" (ngSubmit)="submit()">
                                            <div class="form-group input-group">
                                                <span class="input-group-addon">$</span>
                                                <input type="number" step="any" class="form-control" [(ngModel)]="newTransaction.amount" [ngFormControl]="amountControl" placeholder="Price" required> 
                                            </div>
                                            <div class="form-group input-group">
                                                <span class="input-group-addon">$</span>
                                                <input type="number" step="any" class="form-control" [(ngModel)]="newTransaction.gst" placeholder="GST" required>
                                            </div>
                                            
                                            <categories [amount]="amountControl.valueChanges" [categories]="store.categories | async" (categoryChanged)="setCategory($event)" (subCategoryChanged)="setSubCategory($event)"></categories>                                     
                                            <date-input [date]="date" (dateChanged)="setDate($event)"></date-input>
                                                                                        
                                            <div class="form-group">
                                                <label>Comment</label>
                                                <input class="form-control" [(ngModel)]="newTransaction.comment" placeholder="Comment">
                                            </div>
                                            
                                            <button type="submit" class="btn btn-primary" [disabled]="!transactionForm.form.valid">Submit</button>
                                            <button type="reset" class="btn btn-secondary" (click)="reset()">Reset</button>
                                        </form>
                                    </div>
                                    <!-- /.col-lg-6 (nested) -->
                                    <div class="col-lg-6">
                                        <div class="panel panel-default">
                                            <div class="panel-heading">
                                                {{newTransaction.displayCategory}}
                                            </div>
                                            <div class="panel-body">
                                                <data-table [titles]="titles" [columns]="columns" [dataset]="store.transactions | async | MatchTransaction:newTransaction"></data-table>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- /.col-lg-6 (nested) -->
                                </div>
                                <!-- /.row (nested) -->
                            </div>
                            <!-- /.panel-body -->
                        </div>
                        <!-- /.panel -->
                    </div>
                    <!-- /.col-lg-12 -->
                </div>
                <!-- /.row -->
                <div class="row">
                    <div class="col-lg-12">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                Transactions
                            </div>
                            <div class="panel-body">
                                <div class="row">
                                    <div class="col-lg-4 text-center">
                                        <div class="btn-group" role="group">
                                            <button type="button" class="btn btn-default" aria-label="Left Align" (click)="quarter=quarter-1;showTransactionsMode=1;">
                                                <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                                            </button>
                                            <button type="button" class="btn btn-default" [class.btn-warning]="showTransactionsMode == 1"  (click)="showTransactions(1)">{{quarterString}}</button>
                                            <button type="button" class="btn btn-default" aria-label="Left Align" (click)="quarter=quarter+1;showTransactionsMode=1;">
                                                <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 text-center">
                                        <div class="btn-group" role="group">
                                            <button type="button" class="btn btn-default" aria-label="Left Align" (click)="year=year-1;showTransactionsMode=2;">
                                                <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                                            </button>
                                            <button type="button" class="btn btn-default" [class.btn-success]="showTransactionsMode == 2" (click)="showTransactions(2)">{{yearString}}</button>
                                            <button type="button" class="btn btn-default" aria-label="Left Align" (click)="year=year+1;showTransactionsMode=2;">
                                                <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 text-center">
                                        <div class="btn-group" role="group">
                                            <button type="button" class="btn btn-default" [class.btn-info]="showTransactionsMode == 3" (click)="showTransactions(3)">   All   </button>
                                        </div>
                                    </div>
                                </div>
                                <data-table [delete]="true" (confirmDelete)="delete($event)" [titles]="titles" [columns]="columns" [dataset]="store.transactions | async | dateMatch:showTransactionsMode:quarter:year"></data-table>
                            </div>
                        </div>
                    </div>
                    <!-- /.col-lg-12 -->
                </div>
                <!-- /.row -->
            </div>
        </div>`,
     directives: [DataTable, DateInputComponent, Categories],
     providers: [MatchTransaction,  CompanyStore, CompanyService],
     pipes: [DateMatch, MatchTransaction]
})

export class CompanyTransactionsComponent extends Transactions{
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
    
    constructor(protected store: CompanyStore,
                protected matchTransactionPipe: MatchTransaction) {
        super();
    }
    
    ngOnInit() {
        this.columns = ["displayTransactionDate", "displayCategory", "amount", "gst", "comment"];
        this.titles = ["Transaction Date", "Category", "Amount", "GST", "Comment"];
        this.amountControl.valueChanges.distinctUntilChanged()
            .subscribe(amount => (<CompanyTransaction>this.newTransaction).gst = amount /10);
    }
    
    initialNewTransaction(){
        this.newTransaction = CompanyTransaction.createEmptyCompanyTransaction();
    }

    submit(){
        this.newTransaction.date = this.date;
        this.store.addTransaction(<CompanyTransaction>this.newTransaction)
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