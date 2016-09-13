"use strict";
class Category {
    constructor() {
    }
    static create(name, isIncome = null, subCategories = null, count = null, averageAmount = null) {
        var c = new Category();
        c.name = name;
        if (isIncome != null) {
            c.isIncome = isIncome;
        }
        if (subCategories != null) {
            c.subCategories = subCategories;
        }
        if (count != null) {
            c.count = count;
        }
        if (averageAmount != null) {
            c.averageAmount = averageAmount;
        }
        return c;
    }
}
exports.Category = Category;
//# sourceMappingURL=Category.js.map