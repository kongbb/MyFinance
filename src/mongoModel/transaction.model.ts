import mongoose = require('mongoose');

var transactionSchema = new mongoose.Schema({
        userId: String,
        transactionType: String,
        date: Date,
        amount: Number,
        gst: Number,
        category: String,
        subCategory: String,
        comment: String,
        updatedDate: Date
    }, 
    {
        collection: 'Transactions',
        toJSON: {
            transform: function(doc, ret){
                delete ret._id;
            },
            virtuals: true
        },
        toObject: {
            virtuals: true,
        }
    });

module.exports = mongoose.model('Transaction', transactionSchema);