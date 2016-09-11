import { CompanyTransaction } from '../models/company-transaction';
import { HomeTransaction } from '../models/home-transaction';
import { Category } from '../models/category';

export var CompanyTransactions: CompanyTransaction[] = [
    CompanyTransaction.createCompanyTransaction('', '收入', 'Delia', '2015-06-12', 9900, 900, '', new Date()),
    CompanyTransaction.createCompanyTransaction('', '办公', '手机', '2015-03-12', -66, -6, '', new Date()),
    CompanyTransaction.createCompanyTransaction('', 'TAX', 'GST', '2015-07-12', -11000, 0, '', new Date()),
    CompanyTransaction.createCompanyTransaction('', '收入', 'Roger', '2016-01-12', 8800, 800, '', new Date()),
    CompanyTransaction.createCompanyTransaction('', '办公', '网络', '2016-01-12', -80, -7.8, '', new Date()),
    CompanyTransaction.createCompanyTransaction('', '车', '汽油', '2015-09-12', -66, -6, '', new Date()),
    CompanyTransaction.createCompanyTransaction('', '车', '汽油', '2015-10-12', -88, -8, '', new Date()),
    CompanyTransaction.createCompanyTransaction('', '办公', '网络', '2016-04-12', -80, -7.8, '', new Date()),
    CompanyTransaction.createCompanyTransaction('', '办公', '手机', '2014-11-12', -44, -4, '', new Date()),
    CompanyTransaction.createCompanyTransaction('', '收入', 'Roger', '2015-12-12', 9900, 900, '', new Date()),
    CompanyTransaction.createCompanyTransaction('', '收入', 'Delia', '2016-04-12', 7700, 700, '', new Date()),
];

export var CompanyCategories: Category[] = [
    Category.create("收入", true, [Category.create("Roger", true, null, 2, 8000), Category.create("Delia", true, null, 4, 9900), Category.create("Interest", true, null, 1, 4.5)]),
    Category.create("ATO", false, [ Category.create("PAYG", false, null, 2, -3300), Category.create("GST", false, null, 2, -5500), Category.create("CompanyTax", false, null, 1, -300)]),
    Category.create("办公", false, [ Category.create("网络", false, null, 2, -80), Category.create("手机", false, null, 2, -66), Category.create("电脑", false, null, 1, -1000)]),
];

export var HomeCategories: Category[] = [
    Category.create("Mascot", false, [ Category.create("Water", false, null, 4, -226), Category.create("Gas", false, null, 4, -198), Category.create("Electricity", false, null, 1, -276)]),
    Category.create("Cherrybrook", false, [ Category.create("Council", false, null, 4, -455), Category.create("water", false, null, 4, -256), Category.create("Electricity", false, null, 4, -356)]),
];

export var HomeTransactions: HomeTransaction[] = [
    
];