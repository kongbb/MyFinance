"use strict";
const transaction_1 = require('./transaction');
class CompanyTransaction extends transaction_1.Transaction {
    constructor() {
        super();
    }
    get displayCategory() {
        return this.subCategory == null ? this.category : this.category + "-" + this.subCategory;
    }
    static createCompanyTransaction(id, category, subCategory, date, amount, gst, comment, createdDate) {
        var t = new CompanyTransaction();
        t.id = id;
        t.category = category;
        t.subCategory = subCategory;
        t.date = date;
        t.amount = amount;
        t.gst = gst;
        t.comment = comment;
        t.createdDate = createdDate;
        return t;
    }
    static createEmptyCompanyTransaction() {
        var t = new CompanyTransaction();
        t.date = new Date();
        return t;
    }
}
exports.CompanyTransaction = CompanyTransaction;
//# sourceMappingURL=company-transaction.js.map