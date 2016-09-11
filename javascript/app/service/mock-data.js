"use strict";
const company_transaction_1 = require('../models/company-transaction');
const category_1 = require('../models/category');
exports.CompanyTransactions = [
    company_transaction_1.CompanyTransaction.createCompanyTransaction('', '收入', 'Delia', '2015-06-12', 9900, 900, '', new Date()),
    company_transaction_1.CompanyTransaction.createCompanyTransaction('', '办公', '手机', '2015-03-12', -66, -6, '', new Date()),
    company_transaction_1.CompanyTransaction.createCompanyTransaction('', 'TAX', 'GST', '2015-07-12', -11000, 0, '', new Date()),
    company_transaction_1.CompanyTransaction.createCompanyTransaction('', '收入', 'Roger', '2016-01-12', 8800, 800, '', new Date()),
    company_transaction_1.CompanyTransaction.createCompanyTransaction('', '办公', '网络', '2016-01-12', -80, -7.8, '', new Date()),
    company_transaction_1.CompanyTransaction.createCompanyTransaction('', '车', '汽油', '2015-09-12', -66, -6, '', new Date()),
    company_transaction_1.CompanyTransaction.createCompanyTransaction('', '车', '汽油', '2015-10-12', -88, -8, '', new Date()),
    company_transaction_1.CompanyTransaction.createCompanyTransaction('', '办公', '网络', '2016-04-12', -80, -7.8, '', new Date()),
    company_transaction_1.CompanyTransaction.createCompanyTransaction('', '办公', '手机', '2014-11-12', -44, -4, '', new Date()),
    company_transaction_1.CompanyTransaction.createCompanyTransaction('', '收入', 'Roger', '2015-12-12', 9900, 900, '', new Date()),
    company_transaction_1.CompanyTransaction.createCompanyTransaction('', '收入', 'Delia', '2016-04-12', 7700, 700, '', new Date()),
];
exports.CompanyCategories = [
    category_1.Category.create("收入", true, [category_1.Category.create("Roger", true, null, 2, 8000), category_1.Category.create("Delia", true, null, 4, 9900), category_1.Category.create("Interest", true, null, 1, 4.5)]),
    category_1.Category.create("ATO", false, [category_1.Category.create("PAYG", false, null, 2, -3300), category_1.Category.create("GST", false, null, 2, -5500), category_1.Category.create("CompanyTax", false, null, 1, -300)]),
    category_1.Category.create("办公", false, [category_1.Category.create("网络", false, null, 2, -80), category_1.Category.create("手机", false, null, 2, -66), category_1.Category.create("电脑", false, null, 1, -1000)]),
];
exports.HomeCategories = [
    category_1.Category.create("Mascot", false, [category_1.Category.create("Water", false, null, 4, -226), category_1.Category.create("Gas", false, null, 4, -198), category_1.Category.create("Electricity", false, null, 1, -276)]),
    category_1.Category.create("Cherrybrook", false, [category_1.Category.create("Council", false, null, 4, -455), category_1.Category.create("water", false, null, 4, -256), category_1.Category.create("Electricity", false, null, 4, -356)]),
];
exports.HomeTransactions = [];
