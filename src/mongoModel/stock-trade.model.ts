import mongoose = require("mongoose");

var Schema = mongoose.Schema;

var StockTransactionSchema   = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    confirmationNumber: { type: String, unique: true },
    orderNumber: String,
    security: String,
    buySell: String,
    units: Number,
    price: Number,
    brokerage: Number,
    netAmount: Number,
    tradeDate: Date,
    settlementDate: Date,
    confirmationStatus: String 
}, { collection: "StockTransactions"});

module.exports = mongoose.model("StockTransaction", StockTransactionSchema);