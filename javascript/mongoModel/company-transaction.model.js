"use strict";
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CompanyTransactionSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    date: String,
    amount: Number,
    gst: Number,
    category: String,
    subCategory: String,
    comment: String,
    createdDate: Date
}, { collection: 'CompanyTransactions' });
module.exports = mongoose.model('CompanyTransaction', CompanyTransactionSchema);
