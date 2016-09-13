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
const Observable_1 = require('rxjs/Observable');
const immutable_1 = require('immutable');
const RX_1 = require('rxjs/RX');
const home_transaction_1 = require('../model/home-transaction');
const category_1 = require('../model/category');
const home_service_1 = require('../service/home.service');
let HomeStore = class HomeStore {
    constructor(service) {
        this.service = service;
        this._transactions = new RX_1.BehaviorSubject(immutable_1.List([]));
        this._categories = new RX_1.BehaviorSubject(immutable_1.List([]));
        this._balance = new RX_1.BehaviorSubject(0);
        this.loadInitialData();
    }
    get transactions() {
        return new Observable_1.Observable(fn => this._transactions.subscribe(fn));
    }
    get categories() {
        return new Observable_1.Observable(fn => this._categories.subscribe(fn));
    }
    get balance() {
        return new Observable_1.Observable(fn => this._balance.subscribe(fn));
    }
    loadInitialData() {
        this.service.getTransactions()
            .subscribe(res => {
            let ts = res.json().map((t) => home_transaction_1.HomeTransaction.createHomeTransaction(t._id, t.category, t.subCategory, t.date, t.amount, t.comment, t.createdDate));
            this._transactions.next(immutable_1.List(ts));
            this._balance.next(ts.reduce(function (a, b) { return a + b.amount; }, 0));
        }, err => {
            console.log("Error retrieving home transactions!");
        });
        this.service.getCategories()
            .subscribe(res => {
            let cs = res.json().map((c) => {
                var t = category_1.Category.create(c.name, c.isIncome, null, c.count, c.averageAmount);
                if (c.subCategories && c.subCategories.length > 0) {
                    t.subCategories = c.subCategories.map((s) => category_1.Category.create(s.name, s.isIncome, null, s.count, s.averageAmount));
                }
                return t;
            });
            this._categories.next(immutable_1.List(cs));
        }, err => {
            console.log("Error retrieving home categories");
        });
    }
    addTransaction(tran) {
        this.service.save(tran)
            .subscribe(res => {
            this._transactions.next(this._transactions.getValue().push(tran).sort(this.sortByDate).toList());
            this._balance.next(this._balance.getValue() + tran.amount);
        }, err => {
            console.log("Error saving home categories");
        });
        return this.transactions;
    }
    deleteTransaction(tran) {
        this.service.delete(tran)
            .subscribe(res => {
            this._transactions.next(this._transactions.getValue().remove(this._transactions.getValue().indexOf(tran)));
            this._balance.next(this._balance.getValue() - tran.amount);
        }, err => {
            console.log("Error deleting home categories");
        });
        return this.transactions;
    }
    sortByDate(a, b) {
        if (a.date > b.date) {
            return -1;
        }
        else {
            return 1;
        }
    }
};
HomeStore = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [home_service_1.HomeService])
], HomeStore);
exports.HomeStore = HomeStore;
//# sourceMappingURL=home.store.js.map