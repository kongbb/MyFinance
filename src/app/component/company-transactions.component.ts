const moment = require('moment');
import { Component, OnChanges, ViewChild, AfterViewInit, QueryList } from "@angular/core";
import { FormControl } from "@angular/forms";
import { NgIf } from '@angular/common';
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/RX";
import { ModalDirective } from "ng2-bootstrap";

import { Transactions } from "./transactions";
import { Utility } from "../common/utility";
import { CompanyTransaction } from "../model/company-transaction"
import { Category } from "../model/category";
import { DataTable } from "./data-table.component";
import { MatchTransaction } from "../pipes/match-transaction.pipe";
import { BestGuessCategories } from "../pipes/best-guess-categories.pipe";
import { CompanyStore } from "../dataStores/company.store";
import { DateMatchTransactionPipe } from "../pipes/date-match.pipe";
import { Categories } from "./categories.component";
import { CompanyService } from "../service/company.service";

@Component({
    selector: "company-transactions",
    templateUrl: "../../pages/template/company.html",
    providers: [MatchTransaction,  CompanyStore, CompanyService]
})

export class CompanyTransactionsComponent extends Transactions implements AfterViewInit{
    amountControl: FormControl = new FormControl();
    gst: number;
    
    // @ViewChild("duplicationModal")
    // public duplicationModal: ModalDirective;

    protected duplicationMessage: string;

    constructor(protected store: CompanyStore,
                protected matchTransactionPipe: MatchTransaction) {
        super();
    }
    
    ngOnInit() {
        super.ngOnInit();
        this.columns = ["displayTransactionDate", "displayCategory", "amount", "gst", "comment"];
        this.titles = ["Transaction Date", "Category", "Amount", "GST", "Comment"];
        this.amountControl.valueChanges.distinctUntilChanged()
            .subscribe(amount => {
                (<CompanyTransaction>this.newTransaction).gst = amount /10;
            });
    }

    ngAfterViewInit(){
        this.importConfirmation = this.modalComponents.toArray().find(x => {
            return x.name == "importConfirmation";
        });
        this.skipDuplication = this.modalComponents.toArray().find(x => {
            return x.name == "skipDuplication";
        });
    }

    initialNewTransaction(){
        this.newTransaction = CompanyTransaction.createEmptyCompanyTransaction();
    }

    submit(){
        this.store.addTransaction(<CompanyTransaction>this.newTransaction)
            .subscribe(res => {
                    this.initialNewTransaction();
                },
                err => {
                    alert(err);
                }
            );
    }

    proceedingImport(){
        super.proceedingImport();
        var t = this.store.findTransactionByDateAmount(this.newTransaction);
        if(t != null){
            this.duplicationMessage = t.toString();
            //this.duplicationModal.show();
        }
    }

    skipAllDuplication(){
        super.skipAllDuplication();
        for(var i = this.bulkDone; i < this.bulkTotal; i++){

        }
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

    // reset(){
    //     // this.subCategories = [];
    //     this.initialNewTransaction();
    // }
}