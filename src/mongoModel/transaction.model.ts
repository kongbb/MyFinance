import mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TransactionSchema   = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    userId: String,
    transactionType: String,
    date: String,
    amount: Number,
    gst: Number,
    category: String,
    subCategory: String,
    comment: String,
    createdDate: Date    
}, { collection: 'Transactions'});

module.exports = mongoose.model('Transaction', TransactionSchema);