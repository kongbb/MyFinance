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
let BestGuessCategories = class BestGuessCategories {
    transform(categories, amount) {
        if (categories == null || amount == null || amount == 0) {
            return null;
        }
        var cs = categories.filter(c => amount > 0 ? c.isIncome : !c.isIncome);
        if (cs.size == 0) {
            return null;
        }
        cs.forEach(c => {
            this.calculate(c, amount);
        });
        var array = cs.toArray();
        array.sort(this.compareRank);
        return array;
    }
    calculate(category, amount) {
        if (category.subCategories != null) {
            var rank = 0;
            category.subCategories.forEach(c => {
                this.calculate(c, amount);
                rank += c.rank;
            });
            category.rank = rank;
            category.subCategories.sort(this.compareRank);
        }
        else {
            var averageAmount = Math.abs(category.averageAmount);
            amount = Math.abs(amount);
            if (amount > averageAmount) {
                category.rank = category.count * Math.pow(averageAmount / amount, 2);
            }
            else {
                category.rank = category.count * Math.pow(amount / averageAmount, 2);
            }
        }
    }
    compareRank(a, b) {
        return b.rank - a.rank;
    }
};
BestGuessCategories = __decorate([
    core_1.Pipe({
        name: 'bestGuessCategories',
        pure: false
    }), 
    __metadata('design:paramtypes', [])
], BestGuessCategories);
exports.BestGuessCategories = BestGuessCategories;
//# sourceMappingURL=best-guess-categories.pipe.js.map