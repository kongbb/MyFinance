import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HttpModule, XHRBackend } from "@angular/http";
import { SharedModule } from "../module/shared.module";

import { financeComponents, financePipes, financeDirectives } from "./finance.module.detail";

import { FinanceComponent } from "../component/finance.component";
import { StocksComponent } from "../component/stocks.component";
import { TransactionsComponent } from "../component/transactions.component";

import { StockStore } from "../dataStores/stock.store";
import { StockService } from "../service/stock.service";

import { TransactionStore } from "../dataStores/transaction.store";
import { TransactionService } from "../service/transaction.service";

export const routerConfig : Routes = [
  { 
    path: "finance", 
    component: FinanceComponent, 
    children: [
      {
        path: "",
        component: StocksComponent
      },
      {
        path: "stock",
        component: StocksComponent,
      },
      {
        path: "company",
        component: TransactionsComponent,
      }
    ] 
  },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routerConfig)
  ],
  declarations: [
    ...financeDirectives,
    ...financePipes,
    ...financeComponents
  ],
  exports: [
    FinanceComponent
  ],
  providers: [
    StockStore,
    StockService,
    TransactionStore,
    TransactionService
  ],
})

// export default class FinanceModule { }
export class FinanceModule { }