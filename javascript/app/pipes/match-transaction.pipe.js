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
let MatchTransaction = class MatchTransaction {
    transform(value, target) {
        if (value == null) {
            return null;
        }
        return value.filter(t => {
            return this.compareTransaction(target, t);
        }).slice(0, 15);
    }
    compareTransaction(target, transaction) {
        if (target.amount != null && target.amount != 0) {
            if (!((target.amount > 0 && transaction.amount > 0) || (target.amount < 0 && transaction.amount < 0))) {
                return false;
            }
        }
        if (target.category == null) {
            return false;
        }
        if (target.category && target.category != transaction.category) {
            return false;
        }
        if (target.subCategory && target.subCategory != transaction.subCategory) {
            return false;
        }
        return true;
    }
};
MatchTransaction = __decorate([
    core_1.Pipe({
        name: 'MatchTransaction',
        pure: false
    }), 
    __metadata('design:paramtypes', [])
], MatchTransaction);
exports.MatchTransaction = MatchTransaction;
