import { OnInit } from "@angular/core";
import { Transaction } from '../model/transaction';
import { TransactionType } from '../model/transaction-type';
import { BestGuessCategories } from '../pipes/best-guess-categories.pipe';
import { Utility } from '../common/utility';
import { Category } from '../model/category';
import { FileUploader } from "ng2-file-upload";

const URL = "api/company/transactions";
export abstract class Transactions implements OnInit {
    // variable store all the transactions
    protected allTransactions: Transaction[];
    
    // variable for the right side transactions table
    protected transactions: Transaction[];
    
    // variable store all the categories
    protected categories: Category[];
    
    // variable for displaying corresponding subCategories
    protected subCategories: Category[] = [];
    
    // model
    protected newTransaction: Transaction;
        
    // variable for what needs to be displayed in the table
    protected columns: string[];

    // variable for what needs to be displayed in the table column header
    protected titles: string[];

    protected quarter: number;
    protected year: number;
    
    public transactionBulkUploader: FileUploader = new FileUploader({url: URL});

    // variable for filter in the all transactions table
    protected showTransactionsMode = DisplayTransaactionsMode.currentQuarter;

    protected get quarterString(): string{
        return Utility.getQuarterStringFromQuarterNumber(this.quarter);
    }

    protected get yearString(): string{
        return Utility.getYearStringFromYearNumber(this.year);
    }

    // transactions in current quarter, filter by the category, subCategory of the unsaved transaction    
    protected get matchedTransactions(): Transaction[]{
        throw new Error("Should call actual method in child class. This is because no abstract property in TypeScript.")
    }

    protected abstract initialNewTransaction();

    constructor() {
        this.initialNewTransaction();
        var date = new Date();
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
        // this.importConfirmation.title = "Confirmation";
        // var resJson = JSON.parse(response);
        // this.importConfirmation.message = "Proceed to import " + resJson.transactionsCount + " stock transactions.";
        // this.importConfirmation.arg = resJson.filePath;
        // this.importConfirmation.defaultActionOnly = false;
        // this.importConfirmation.show();
    }
    
    onErrorItem(item: any, response: string, status: number, headers: any){
        // this.importConfirmation.title = "Error";
        // this.importConfirmation.message = "Error occurred during analysing file.";
        // this.importConfirmation.defaultActionOnly = true;
        // this.stockBulkUploader.removeFromQueue(item);
        // this.importConfirmation.show();
    }

    onAfterAddingFile(item: any){
        this.transactionBulkUploader.uploadItem(item);
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
        
    submit(){
        //this.service.save(this.newTransaction);
    }
    
    reset(){
        this.subCategories = [];
        this.initialNewTransaction();
    }
    
    resetCategory(){
        this.newTransaction.category = null;
        this.newTransaction.subCategory = null;
        this.subCategories = null;
    }
}

enum DisplayTransaactionsMode { currentQuarter = 1, currentFinancialYear = 2, all = 4 }