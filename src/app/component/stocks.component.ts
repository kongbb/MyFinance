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
        this.columns = ["code", "tradeDate", "soldPrice", "units", "soldAmount", "purchaseAmount", "profit"];
        this.titles = ["Code", "Date", "Sold Price", "Units", "Sold Amount", "Purchase Amount", "Profit"];

        this.holdingColumns = ["code", "units", "price", "amount", "currentPrice", "currentMarketValue", "profit"];
        this.holdingTitles = ["Code", "Units", "Purchase Price", "Net Amount", "Current Price", "Current Market Value", "Profit"];
        this.stockBulkUploader.onCompleteItem = (item: any, response: string, status: number, headers: any) => {
            this.onFileUploadComplete(item, response, status, headers);
        };
        this.stockBulkUploader.onErrorItem = (item: any, response: string, status: number, headers: any) => {
            this.onFileUploadError(item, response, status, headers);
        };
    }

    onFileUploadComplete(item: any, response: string, status: number, headers: any){
        this.importConfirmation.title = "Confirmation";
        var resJson = JSON.parse(response);
        this.importConfirmation.message = "Proceed to import " + resJson.transactionsCount + " stock transactions.";
        this.importConfirmation.arg = resJson.filePath;
        this.importConfirmation.show();
    }
    
    onFileUploadError(item: any, response: string, status: number, headers: any){
        this.importConfirmation.title = "Error";
        this.importConfirmation.message = "Error occurred during analysing file.";
        this.importConfirmation.show();
    }

    confirmImport(){
        this.store.importStockTrades(this.importConfirmation.arg);
    }

    test(){
        this.importConfirmation.show();
    }
}
