import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Routes, Router, RouterModule, Route } from "@angular/router";
import { NgIf } from '@angular/common';

import { UserStore } from "../dataStores/user.store";
import { FinanceComponent } from "../component/finance.component";
import { StocksComponent } from "../component/stocks.component";
import { TransactionsComponent } from "../component/transactions.component";
import { HomeComponent } from "../component/home.component";
import { TransactionStoreResolver } from "../resolver/transaction.store.resolver";
import { TransactionTypeResolver } from "../resolver/transaction.type.resolver";

@Component({
    selector: 'navigation',
    templateUrl: "../../pages/template/navigation.html"
})

export class NavigationComponent implements OnInit {
    constructor(private store: UserStore, private router: Router){
    }

    ngOnInit(){
        // need to find a way to dynamically add new routes not reset
        // reset will remove all routes defined in root level
        // if we do following 2 lines, there is only one TransactionComponent instance
        // not created per route
        // this.router.config.push(this.routerConfig);
        // this.router.resetConfig(this.router.config);
        this.router.resetConfig(this.routerConfig);
    }

    private routerConfig : Routes = [
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
                    path: "transactions/:type",
                    component: TransactionsComponent,
                    resolve: {
                        store: TransactionStoreResolver,
                        type: TransactionTypeResolver
                    }
                }
            ]
        },
        { 
            path: "", 
            component: HomeComponent,
        }]
    ;
}