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
const utility_1 = require('../common/utility');
let DateMatch = class DateMatch {
    transform(value, number, quarter, year) {
        if (value == null) {
            return null;
        }
        return value.filter(t => {
            return this.match(number, t, quarter, year);
        });
    }
    match(number, transaction, quarter, year) {
        if (number == 1) {
            return utility_1.Utility.getQuarterNumber(transaction.date) == quarter;
        }
        if (number == 2) {
            return utility_1.Utility.getYearNumber(transaction.date) == year;
        }
        if (number == 3) {
            return true;
        }
        throw new Error('invalid match number');
    }
};
DateMatch = __decorate([
    core_1.Pipe({
        name: 'dateMatch',
        pure: false
    }), 
    __metadata('design:paramtypes', [])
], DateMatch);
exports.DateMatch = DateMatch;
//# sourceMappingURL=date-match.pipe.js.map