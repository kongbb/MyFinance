"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const forms_1 = require('@angular/forms');
const Observable_1 = require('rxjs/Observable');
const best_guess_categories_pipe_1 = require('../pipes/best-guess-categories.pipe');
let Categories = class Categories {
    constructor(bestGuessCategoriesPipe) {
        this.bestGuessCategoriesPipe = bestGuessCategoriesPipe;
        this.categoryChanged = new core_1.EventEmitter();
        this.subCategoryChanged = new core_1.EventEmitter();
        this.categoryControl = new forms_1.FormControl();
        this.newCategoryControl = new forms_1.FormControl();
        this.newSubCategoryControl = new forms_1.FormControl();
    }
    set category(value) {
        this._category = value;
        this.categoryChanged.next(value);
    }
    get category() {
        return this._category;
    }
    set subCategory(value) {
        this._subCategory = value;
        this.subCategoryChanged.next(value);
    }
    get subCategory() {
        return this._subCategory;
    }
    shouldDisplayCategoryDropdown(amount) {
        if (amount != null
            && amount != 0
            && (!(this.bestGuessCategories == null || this.bestGuessCategories.length == 0))) {
            return true;
        }
        else {
            if (this.category != null) {
                this.category = null;
            }
            return false;
        }
    }
    shouldDisplayNewCategoryInput(category) {
        if (category != null
            && category == '') {
            return true;
        }
        if (this.bestGuessCategories == null || this.bestGuessCategories.length == 0) {
            return true;
        }
        return false;
    }
    get displaySubCategoryDropdown() {
        return this.subCategories && this.subCategories.length > 0;
    }
    get displayCreateNewSubCategory() {
        if (this.category == ''
            && this.newCategory != null
            && this.newCategory != '') {
            return true;
        }
        if (this.subCategory == '') {
            return true;
        }
        return false;
    }
    handleAmountChanged(amount) {
        this.bestGuessCategories = this.bestGuessCategoriesPipe.transform(this.categories, amount);
        if (this.bestGuessCategories != null && this.bestGuessCategories.length > 0) {
            if (this.category != this.bestGuessCategories[0].name) {
                this.category = this.bestGuessCategories[0].name;
            }
        }
        this.displayCategoryDropdown = this.shouldDisplayCategoryDropdown(amount);
    }
    handleCategoryChanged(newValue) {
        if (newValue) {
            this.subCategories = this.bestGuessCategories.find(c => c.name == newValue).subCategories;
            if (this.subCategories != null && this.subCategories.length > 0) {
                this.subCategory = this.subCategories[0].name;
            }
            else {
                this.subCategory = null;
            }
        }
        else {
            this.subCategories = [];
        }
        this.displayNewCategoryInput = this.shouldDisplayNewCategoryInput(newValue);
    }
    ngOnInit() {
        this.amount
            .debounceTime(300)
            .distinctUntilChanged().subscribe(a => {
            this.handleAmountChanged(a);
        });
        this.categoryControl
            .valueChanges
            .distinctUntilChanged()
            .subscribe(c => {
            this.handleCategoryChanged(c);
        });
        this.newCategoryControl.valueChanges
            .debounceTime(400)
            .distinctUntilChanged()
            .subscribe(c => {
            if (c != null) {
                this.categoryChanged.next(c);
            }
        });
        this.newSubCategoryControl.valueChanges
            .debounceTime(400)
            .distinctUntilChanged()
            .subscribe(s => {
            if (s != null) {
                this.subCategoryChanged.next(s);
            }
        });
    }
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', Observable_1.Observable)
], Categories.prototype, "amount", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Array)
], Categories.prototype, "categories", void 0);
__decorate([
    core_1.Output(), 
    __metadata('design:type', Object)
], Categories.prototype, "categoryChanged", void 0);
__decorate([
    core_1.Output(), 
    __metadata('design:type', Object)
], Categories.prototype, "subCategoryChanged", void 0);
Categories = __decorate([
    core_1.Component({
        selector: 'categories',
        template: `<div *ngIf="displayCategoryDropdown" class="form-group">
                    <label>Category</label>
                    <select class="form-control" [(ngModel)]="category" [ngFormControl]="categoryControl" required>
                        <option *ngFor="let c of bestGuessCategories;let i = index" [selected]="i == 0" [value]="c.name">{{c.name}}</option>
                        <option value="">Create new Category</option>
                    </select>
                </div>
                
                <div [hidden]="!displayNewCategoryInput" class="form-group">
                    <label>New Category</label>
                    <input class="form-control" [ngFormControl]="newCategoryControl" placeholder="Enter new category" [(ngModel)]="newCategory">
                </div>
                
                <div [hidden]="!displaySubCategoryDropdown" class="form-group">
                    <label>Sub-Category</label>
                    <select class="form-control" [(ngModel)]="subCategory">
                        <option *ngFor="let s of subCategories; let i = index" [selected]="i == 0" [value]="s.name">{{s.name}}</option>
                        <option value="">Create new SubCategory</option>
                    </select>
                </div>
                
                <div [hidden]="!displayCreateNewSubCategory" class="form-group">
                    <label>New Sub-Category</label>
                    <input class="form-control" [ngFormControl]="newSubCategoryControl" placeholder="Enter new sub-category">
                </div>`,
        providers: [best_guess_categories_pipe_1.BestGuessCategories],
    }), 
    __metadata('design:paramtypes', [best_guess_categories_pipe_1.BestGuessCategories])
], Categories);
exports.Categories = Categories;
