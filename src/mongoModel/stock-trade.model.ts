import mongoose = require("mongoose");

var Schema = mongoose.Schema;

var StockTransactionSchema   = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    reference: { type: String, unique: true },
    orderNumber: String,
    security: String,
    buySell: String,
    units: Number,
    price: Number,
    brokerage: Number,
    netAmount: Number,
    tradeDate: Date,
}, { collection: "StockTransactions"});

module.exports = mongoose.model("StockTransaction", StockTransactionSchema);