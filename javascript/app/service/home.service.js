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
const http_1 = require('@angular/http');
let HomeService = class HomeService {
    constructor(http) {
        this.http = http;
    }
    getTransactions() {
        return this.http.get('/home/transactions');
    }
    getCategories() {
        return this.http.get('/home/categories');
    }
    save(transaction) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        return this.http.post('/home/transactions', JSON.stringify(transaction), { headers: headers }).share();
    }
    delete(transaction) {
        return this.http.delete('/home/transactions/' + transaction.id);
    }
    transformHomeTransaction(tran) {
        return {
            Category: tran.category,
            SubCategory: tran.subCategory,
            Date: tran.date,
            Amount: tran.amount,
            Comment: tran.comment,
            CreatedDate: tran.createdDate
        };
    }
};
HomeService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http])
], HomeService);
exports.HomeService = HomeService;
//# sourceMappingURL=home.service.js.map