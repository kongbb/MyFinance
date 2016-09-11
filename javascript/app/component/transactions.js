"use strict";
const utility_1 = require('../common/utility');
class Transactions {
    constructor() {
        this.subCategories = [];
        this.showTransactionsMode = DisplayTransaactionsMode.currentQuarter;
        this.initialNewTransaction();
        var date = new Date();
        this.quarter = utility_1.Utility.getQuarterNumber(date);
        this.year = utility_1.Utility.getYearNumber(date);
    }
    get quarterString() {
        return utility_1.Utility.getQuarterStringFromQuarterNumber(this.quarter);
    }
    get yearString() {
        return utility_1.Utility.getYearStringFromYearNumber(this.year);
    }
    get matchedTransactions() {
        throw new Error("Should call actual method in child class. This is because no abstract property in TypeScript.");
    }
    setCategory(value) {
        this.newTransaction.category = value;
    }
    setSubCategory(value) {
        this.newTransaction.subCategory = value;
    }
    setDate(results) {
        this.newTransaction.date = results;
    }
    showTransactions(number) {
        this.showTransactionsMode = number;
    }
    submit() {
    }
    reset() {
        this.subCategories = [];
        this.initialNewTransaction();
    }
    resetCategory() {
        this.newTransaction.category = null;
        this.newTransaction.subCategory = null;
        this.subCategories = null;
    }
}
exports.Transactions = Transactions;
var DisplayTransaactionsMode;
(function (DisplayTransaactionsMode) {
    DisplayTransaactionsMode[DisplayTransaactionsMode["currentQuarter"] = 1] = "currentQuarter";
    DisplayTransaactionsMode[DisplayTransaactionsMode["currentFinancialYear"] = 2] = "currentFinancialYear";
    DisplayTransaactionsMode[DisplayTransaactionsMode["all"] = 4] = "all";
})(DisplayTransaactionsMode || (DisplayTransaactionsMode = {}));
