import { Component, OnInit, ViewChild } from "@angular/core";
import { ModalComponent } from "../component/modal.component";
import { StockStore } from "../dataStores/stock.store";
import { StockService } from "../service/stock.service";
import { FileUploader } from "ng2-file-upload";

const URL = "api/stocks";
@Component({
    selector: "stocks",
    templateUrl: "../../pages/template/stocks.html",
    providers: [StockStore, StockService]
})
export class StocksComponent implements OnInit{
    errorMessage: string;
    // variable for what needs to be displayed in the table
    protected columns: string[];

    // variable for what needs to be displayed in the table column header
    protected titles: string[];

    // variable for what needs to be displayed in the table
    protected holdingColumns: string[];

    // variable for what needs to be displayed in the table column header
    protected holdingTitles: string[];
    
    public stockBulkUploader: FileUploader = new FileUploader({url: URL});

    @ViewChild(ModalComponent)
    public importConfirmation: ModalComponent;

    constructor (private store: StockStore) {}

    ngOnInit() {
        this.columns = ["code", "tradeDate", "price", "units", "netAmount", "profit"];
        this.titles = ["Code", "Date", "Sold Price", "Units", "Sold Amount", "Profit"];

        this.holdingColumns = ["code", "units", "price", "amount", "currentPrice", "currentMarketValue", "profit"];
        this.holdingTitles = ["Code", "Units", "Purchase Price", "Net Amount", "Current Price", "Current Market Value", "Profit"];
        this.stockBulkUploader.onSuccessItem = (item: any, response: string, status: number, headers: any) => {
            this.onSuccessItem(item, response, status, headers);
        };
        this.stockBulkUploader.onErrorItem = (item: any, response: string, status: number, headers: any) => {
            this.onErrorItem(item, response, status, headers);
        };
        this.stockBulkUploader.onAfterAddingFile = (item: any) => {
            this.onAfterAddingFile(item);
        }
    }

    onSuccessItem(item: any, response: string, status: number, headers: any){
        this.importConfirmation.title = "Confirmation";
        var resJson = JSON.parse(response);
        this.importConfirmation.message = "Proceed to import " + resJson.transactionsCount + " stock transactions.";
        this.importConfirmation.arg = resJson.filePath;
        this.importConfirmation.defaultActionOnly = false;
        this.importConfirmation.show();
    }
    
    onErrorItem(item: any, response: string, status: number, headers: any){
        this.importConfirmation.title = "Error";
        this.importConfirmation.message = "Error occurred during analysing file.";
        this.importConfirmation.defaultActionOnly = true;
        this.stockBulkUploader.removeFromQueue(item);
        this.importConfirmation.show();
    }

    onAfterAddingFile(item: any){
        this.stockBulkUploader.uploadItem(item);
    }

    confirmImport(){
        this.store.importStockTrades(this.importConfirmation.arg);
    }
}
