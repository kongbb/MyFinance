const moment = require('moment');
import { OnInit, ViewChild } from "@angular/core";
import { ModalComponent } from "../component/modal.component";
import { Transaction } from '../model/transaction';
import { TransactionType } from '../model/transaction-type';
import { BestGuessCategories } from '../pipes/best-guess-categories.pipe';
import { Utility } from '../common/utility';
import { Category } from '../model/category';
import { FileUploader } from "ng2-file-upload";

const URL = "api/company";
export abstract class Transactions implements OnInit {
    // variable store all the transactions
    protected allTransactions: Transaction[];
    
    // variable for the right side transactions table
    protected transactions: Transaction[];
    
    // temporary transactions extracted from upload file
    protected importingTrans: Transaction[];
    
    // variable store all the categories
    protected categories: Category[];
    
    // variable for displaying corresponding subCategories
    // protected subCategories: Category[] = [];
    
    // model
    protected newTransaction: Transaction;
        
    // variable for what needs to be displayed in the table
    protected columns: string[];

    // variable for what needs to be displayed in the table column header
    protected titles: string[];

    protected quarter: number;
    protected year: number;

    protected isImporting: boolean;
    protected bulkTotal: number;
    protected bulkDone: number;
    protected bulkSkipped: number;
    
    public transactionBulkUploader: FileUploader = new FileUploader({url: URL});

    @ViewChild(ModalComponent)
    public modalConfirmation: ModalComponent;

    // variable for filter in the all transactions table
    protected showTransactionsMode = DisplayTransaactionsMode.currentQuarter;

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

    protected abstract initialNewTransaction();

    public alerts: any = [];

    constructor() {
        this.initialNewTransaction();
        var date = Utility.getToday();
        this.quarter = Utility.getQuarterNumber(date);
        this.year = Utility.getYearNumber(date);
    }
    
    ngOnInit() {
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

    onSuccessItem(item: any, response: string, status: number, headers: any){
        var trades = JSON.parse(response);
        this.transactionBulkUploader.clearQueue();
        this.modalConfirmation.title = "Confirmation";
        
        //mock up data
        this.importingTrans = new Array<Transaction>();
        
        var transaction = new Transaction();
        transaction.amount = -39;
        transaction.date = Utility.getToday();
        this.importingTrans.push(transaction);

        transaction = new Transaction();
        transaction.amount = 87;
        transaction.date = new Date(2017, 1, 25);
        this.importingTrans.push(transaction);

        transaction = new Transaction();
        transaction.amount = -6;
        transaction.date = new Date(2017, 1, 13);
        this.importingTrans.push(transaction);

        transaction = new Transaction();
        transaction.amount = 87;
        transaction.date = new Date(2017, 1, 25);
        this.importingTrans.push(transaction);

        transaction = new Transaction();
        transaction.amount = 90;
        transaction.date = Utility.getToday();
        this.importingTrans.push(transaction);

        this.modalConfirmation.message = "Proceed to import " + this.importingTrans.length + "  transactions.";
        this.modalConfirmation.defaultActionOnly = false;
        this.modalConfirmation.show();
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

    submitImportedTran(){
        this.submit();
        this.bulkDone++;
        this.proceedingImport();
    }

    skipImport(){
        this.bulkSkipped++;
        this.bulkDone++;
        this.proceedingImport();
    }

    skipAllDuplication(){
        for(var i = this.bulkDone; i < this.bulkTotal; i++){

        }
    }

    proceedingImport(){
        if(this.bulkDone == this.bulkTotal){
            this.stopImport();
        }
        var tran = this.importingTrans[this.bulkDone];
        this.initialNewTransaction();
        this.newTransaction.amount = tran.amount;
        this.newTransaction.date = moment(tran.date).format("YYYY-MM-DD");
    }

    setCategory(value: string){
        this.newTransaction.category = value;
    }

    setSubCategory(value: string){
        this.newTransaction.subCategory = value;
    }

    setValue(value: any){
        this.newTransaction.amount = value.amount;
        this.newTransaction.gst = value.gst;
        this.newTransaction.category = value.category;
        this.newTransaction.subCategory = value.subCategory;
    }

    // setDate(results: Date){
    //     this.newTransaction.date = results;
    // }
    
    showTransactions(number){
        this.showTransactionsMode = number;
    }
        
    protected abstract submit();
    
    // reset(){
    //     // this.subCategories = [];
    //     this.initialNewTransaction();
    // }
    
    resetCategory(){
        this.newTransaction.category = null;
        this.newTransaction.subCategory = null;
        // this.subCategories = null;
    }
}

enum DisplayTransaactionsMode { currentQuarter = 1, currentFinancialYear = 2, all = 4 }