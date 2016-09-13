"use strict";
const moment = require('moment');
const utility_1 = require('../common/utility');
class Transaction {
    constructor() {
        this.date = new Date();
    }
    clone() {
        return new this.constructor;
    }
    get displayCategory() {
        return this.subCategory == null ? this.category : this.category + "-" + this.subCategory;
    }
    get displayTransactionDate() {
        return moment(this.date).format('YYYY-MM-DD');
    }
    get quarter() {
        return utility_1.Utility.getQuarterString(this.date);
    }
    static create(category, subCategory, date, amount) {
        var t = new Transaction();
        t.category = category;
        t.subCategory = subCategory;
        t.date = date;
        t.amount = amount;
        t.createdDate = new Date();
        return t;
    }
    static createEmpty() {
        var t = new Transaction();
        t.createdDate = new Date();
        return t;
    }
}
exports.Transaction = Transaction;
//# sourceMappingURL=transaction.js.map