const moment = require('moment');
import { OnInit, ViewChild, ViewChildren, QueryList, Component, OnChanges, AfterViewInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { NgIf } from '@angular/common';
import { Observable } from "rxjs/Observable";
import { BehaviorSubject, Subscription } from "rxjs/RX";
import { ActivatedRoute } from "@angular/router";

import { Utility } from "../common/utility";
import { Category } from "../model/category";
import { TransactionType } from "../model/transaction-type";
import { DataTable } from "./data-table.component";
import { MatchTransaction } from "../pipes/match-transaction.pipe";
import { BestGuessCategories } from "../pipes/best-guess-categories.pipe";
import { TransactionStore } from "../dataStores/transaction.store";
import { DateMatchTransactionPipe } from "../pipes/date-match.pipe";
import { Categories } from "./categories.component";
import { TransactionService } from "../service/transaction.service";

import { ModalComponent } from "../component/modal.component";
import { Transaction } from '../model/transaction';
import { FileUploader } from "ng2-file-upload";

@Component({
    selector: "transactions",
    templateUrl: "../../pages/template/transactions.html",
})

export class TransactionsComponent implements OnInit, AfterViewInit {
    public transactionBulkUploader: FileUploader;
    // temporary transactions extracted from upload file
    protected importingTrans: Transaction[];

    protected isImporting: boolean;
    protected bulkTotal: number;
    protected bulkDone: number;
    protected bulkSkipped: number;

    // model
    protected newTransaction: Transaction;
        
    // variable for what needs to be displayed in the table
    protected columns: string[];

    // variable for what needs to be displayed in the table column header
    protected titles: string[];

    protected quarter: number;
    protected year: number;

    @ViewChildren(ModalComponent)
    public modalComponents: QueryList<ModalComponent>;

    protected importConfirmation: ModalComponent;
    protected skipDuplication: ModalComponent;

    // variable for filter in the all transactions table
    protected showTransactionsMode = DisplayTransaactionsMode.currentQuarter;

    public alerts: any = [];

    private transactionType: TransactionType;

    amountControl: FormControl = new FormControl();

    protected store: TransactionStore;

    protected get quarterString(): string{
        return Utility.getQuarterStringFromQuarterNumber(this.quarter);
    }

    protected get yearString(): string{
        return Utility.getYearStringFromYearNumber(this.year);
    }

    protected get progressMessage(): string{
        return this.bulkDone + " out of " + this.bulkTotal + "proceeded.";
    }

    // transactions in current quarter, filter by the category, subCategory of the unsaved transaction    
    protected get matchedTransactions(): Transaction[]{
        throw new Error("Should call actual method in child class. This is because no abstract property in TypeScript.")
    }

    constructor(private activatedRoute: ActivatedRoute,
                protected matchTransactionPipe: MatchTransaction) {
    }
    
    ngOnInit() {
        this.transactionType = this.activatedRoute.snapshot.data["type"];
        this.store = this.activatedRoute.snapshot.data["store"];
        this.transactionBulkUploader = new FileUploader({url: "api/transactions"});
        this.initialNewTransaction();
        var date = Utility.getToday();
        this.quarter = Utility.getQuarterNumber(date);
        this.year = Utility.getYearNumber(date);

        this.columns = ["displayTransactionDate", "displayCategory", "amount", "comment"];
        this.titles = ["Transaction Date", "Category", "Amount", "Comment"];
        if(this.transactionType.includeGST){
            this.columns.splice(3, 0, "gst");
            this.titles.splice(3, 0, "GST");

            this.amountControl.valueChanges.distinctUntilChanged()
                .subscribe(amount => {
                    (<Transaction>this.newTransaction).gst = Utility.round(amount /10);
                });
        }

        this.transactionBulkUploader.onSuccessItem = (item: any, response: string, status: number, headers: any) => {
            this.onSuccessItem(item, response, status, headers);
        };
        this.transactionBulkUploader.onErrorItem = (item: any, response: string, status: number, headers: any) => {
            this.onErrorItem(item, response, status, headers);
        };
        this.transactionBulkUploader.onAfterAddingFile = (item: any) => {
            this.onAfterAddingFile(item);
        }
    }

    ngAfterViewInit(){
        this.importConfirmation = this.modalComponents.toArray().find(x => {
            return x.name == "importConfirmation";
        });
        this.skipDuplication = this.modalComponents.toArray().find(x => {
            return x.name == "skipDuplication";
        });
    }

    protected initialNewTransaction(){
        this.newTransaction = new Transaction();
    }

    onSuccessItem(item: any, response: string, status: number, headers: any){
        var trades = JSON.parse(response);
        this.transactionBulkUploader.clearQueue();
        this.importConfirmation.title = "Confirmation";
        this.importingTrans = trades;
        this.importConfirmation.message = "Proceed to import " + this.importingTrans.length + "  transactions.";
        this.importConfirmation.defaultActionOnly = false;
        this.importConfirmation.show();
    }
    
    onErrorItem(item: any, response: string, status: number, headers: any){
        this.alerts.push(Utility.createAlert("danger", "Unable to analyse the file.", 5000));
        this.transactionBulkUploader.clearQueue();
    }

    onAfterAddingFile(item: any){
        this.transactionBulkUploader.uploadItem(item);
    }

    startImport(){
        this.isImporting = true;
        this.bulkDone = 0;
        this.bulkSkipped = 0;
        this.bulkTotal = this.importingTrans.length;
        this.proceedingImport();
    }

    stopImport(){
        this.isImporting = false;
        this.importingTrans = [];
        this.initialNewTransaction();
        var message = (this.bulkDone - this.bulkSkipped) + "imported, " + this.bulkSkipped + " skipped.";
        if(this.bulkDone < this.bulkTotal){
            this.alerts.push(Utility.createAlert("warning", "Importing stopped! " + message, 5000));
        }
        else{
            this.alerts.push(Utility.createAlert("info", message, 5000));
        }
    }

    skipImport(){
        this.bulkSkipped++;
        this.bulkDone++;
        this.proceedingImport();
    }

    skipAllDuplication(){
        throw new Error("not implemented")
    }

    skipDuplicationActions($event){
        switch ($event.index){
            case 0:
                this.skipImport();
                break;
            case 1:
                this.skipAllDuplication();
                break;
            default:
                throw new Error("Wrong event!")
        }
    }

    proceedingImport(){
        if(this.bulkDone == this.bulkTotal){
            this.stopImport();
        }
        var tran = this.importingTrans[this.bulkDone];
        this.initialNewTransaction();
        this.newTransaction.amount = tran.amount;
        //update GST value here because if multiple transactions with same amount during importing,
        //gst would be left as empty
        this.newTransaction.gst = Math.round(tran.amount * 10) / 100;
        this.newTransaction.date = moment(tran.date).format("YYYY-MM-DD");
        this.newTransaction.comment = tran.comment;
    }

    setCategory(value: string){
        this.newTransaction.category = value;
    }

    setSubCategory(value: string){
        this.newTransaction.subCategory = value;
    }
    
    showTransactions(number){
        this.showTransactionsMode = number;
    }
        
    submit(){
        this.newTransaction.userId = "roger";
        this.newTransaction.transactionType = this.transactionType.code;
        this.store.addTransaction(<Transaction>this.newTransaction)
            .subscribe(res => {
                    this.initialNewTransaction();
                },
                err => {
                    this.alerts.push(Utility.createAlert("danger", err, 5000));
                }
            );
    }
    
    submitImportedTran(){
        this.newTransaction.userId = "roger";
        this.newTransaction.transactionType = this.transactionType.code;
        this.store.addTransaction(<Transaction>this.newTransaction)
            .subscribe(res => {
                    this.bulkDone++;
                    this.proceedingImport();
                },
                err => {
                    this.alerts.push(Utility.createAlert("danger", err, 5000));
                }
            );
    }
    
    resetCategory(){
        this.newTransaction.category = null;
        this.newTransaction.subCategory = null;
    }

    reset(){
        this.initialNewTransaction();
    }
}

enum DisplayTransaactionsMode { currentQuarter = 1, currentFinancialYear = 2, all = 4 }