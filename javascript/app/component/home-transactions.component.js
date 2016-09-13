"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const common_1 = require('@angular/common');
const Observable_1 = require('rxjs/Observable');
const transactions_1 = require('./transactions');
const home_transaction_1 = require('../model/home-transaction');
const date_input_component_1 = require('./date-input.component');
const data_table_component_1 = require('./data-table.component');
const match_transaction_pipe_1 = require('../pipes/match-transaction.pipe');
const home_store_1 = require('../dataStores/home.store');
const date_match_pipe_1 = require('../pipes/date-match.pipe');
const categories_component_1 = require('./categories.component');
const home_service_1 = require('../service/home.service');
let HomeTransactionsComponent = class HomeTransactionsComponent extends transactions_1.Transactions {
    constructor(store, matchTransactionPipe) {
        super();
        this.store = store;
        this.matchTransactionPipe = matchTransactionPipe;
        this.amountControl = new common_1.Control();
        this.date = new Date();
    }
    setDate(results) {
        this.date = results;
    }
    get dateObservable() {
        return new Observable_1.Observable(fn => this.dateSubject.subscribe(fn));
    }
    ngOnInit() {
        this.columns = ["displayTransactionDate", "displayCategory", "amount", "comment"];
        this.titles = ["Transaction Date", "Category", "Amount", "Comment"];
    }
    initialNewTransaction() {
        this.newTransaction = home_transaction_1.HomeTransaction.createEmptyHomeTransaction();
    }
    submit() {
        this.newTransaction.date = this.date;
        this.store.addTransaction(this.newTransaction)
            .subscribe(res => {
            this.initialNewTransaction();
        }, err => {
            alert(err);
        });
    }
    delete(tran) {
        this.store.deleteTransaction(tran)
            .subscribe(res => {
        }, err => {
            alert(err);
        });
    }
    reset() {
        this.subCategories = [];
        this.initialNewTransaction();
    }
};
HomeTransactionsComponent = __decorate([
    core_1.Component({
        selector: 'home-transactions',
        template: `
    <div id="wrapper">
        <div id="page-wrapper">
                <div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">Vigny Home</h1>
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
        directives: [data_table_component_1.DataTable, date_input_component_1.DateInputComponent, categories_component_1.Categories],
        providers: [match_transaction_pipe_1.MatchTransaction, home_store_1.HomeStore, home_service_1.HomeService],
        pipes: [date_match_pipe_1.DateMatch, match_transaction_pipe_1.MatchTransaction]
    }), 
    __metadata('design:paramtypes', [home_store_1.HomeStore, match_transaction_pipe_1.MatchTransaction])
], HomeTransactionsComponent);
exports.HomeTransactionsComponent = HomeTransactionsComponent;
//# sourceMappingURL=home-transactions.component.js.map