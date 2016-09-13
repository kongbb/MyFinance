"use strict";
const transaction_1 = require('./transaction');
class HomeTransaction extends transaction_1.Transaction {
    constructor() {
        super();
    }
    static createHomeTransaction(id, category, subCategory, date, amount, comment, createdDate) {
        var t = new HomeTransaction();
        t.id = id;
        t.category = category;
        t.subCategory = subCategory;
        t.date = date;
        t.amount = amount;
        t.comment = comment;
        t.createdDate = createdDate;
        return t;
    }
    static createEmptyHomeTransaction() {
        var t = new HomeTransaction();
        t.date = new Date();
        return t;
    }
}
exports.HomeTransaction = HomeTransaction;
//# sourceMappingURL=home-transaction.js.map