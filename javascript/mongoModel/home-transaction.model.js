"use strict";
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var HomeTransactionSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    date: Date,
    amount: Number,
    category: String,
    subCategory: String,
    comment: String,
    createdDate: Date
}, { collection: 'HomeTransactions' });
module.exports = mongoose.model('HomeTransaction', HomeTransactionSchema);
//# sourceMappingURL=home-transaction.model.js.map