import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';

import Config from "../common/configuration";
import { Category } from '../model/Category';
import { BestGuessCategories } from '../pipes/best-guess-categories.pipe';

@Component({
    selector: 'categories',
    templateUrl: "../../pages/template/categories.html"
})

export class Categories {
    @Input()
    public amount: Observable<Number>

    @Input()
    categories: Category[]

    @Output() categoryChanged = new EventEmitter();

    @Output() subCategoryChanged = new EventEmitter();
    
    categoryControl: FormControl = new FormControl();
    newCategoryControl: FormControl = new FormControl();
    newSubCategoryControl: FormControl = new FormControl();

    protected bestGuessCategories: Category[];
    private subCategories: Category[]
    private defaultCategory: Category = Category.create(Config.NewCategory, null, null, null, null);
    private defaultSubCategory: Category = Category.create(Config.NewSubCategory, null, null, null, null);

    protected displayCategoryDropdown: boolean;
    protected displayNewCategoryInput: boolean;
    
    private _category: String;
    set category(value){
       this._category = value;
       this.displayNewCategoryInput = this.shouldDisplayNewCategoryInput(value);
       this.categoryChanged.emit(value);
    }
    get category(){
       return this._category;
    }

    private _subCategory: String;
    set subCategory(value){
       this._subCategory = value;
       this.subCategoryChanged.emit(value);
    }
    get subCategory(){
       return this._subCategory;
    }
    
    protected shouldDisplayCategoryDropdown(amount: Number): boolean{
        return amount != null && amount != 0;
        // if(amount != null 
        //     && amount != 0 
        //     && (!(this.bestGuessCategories == null || this.bestGuessCategories.length == 0))){
        //         return true;
        //     }
        // else{
        //     if(this.category != null){
        //         this.category = null;
        //     }
        //     return false;
        // }
    }
    protected shouldDisplayNewCategoryInput(category): boolean{
        return category != null && category == "Create new Category";
        // if(category != null 
        //     && category == ''){
        //     return true;
        // }
        // // with best-guess.pipe, unless no any income category or no any outcome, 
        // // otherwise bestGuessFCategories always return something
        // if(this.bestGuessCategories == null || this.bestGuessCategories.length == 0){
        //     return true;
        // }
        
        // return false;
    }

    protected get displaySubCategoryDropdown(): boolean{
        return this.category != "Create new Category" && this.subCategories && this.subCategories.length > 0;    
    }
    
    protected get displayCreateNewSubCategory(): boolean{
        return this.category == "Create new Category" || this.subCategory == "Create new SubCategory";
        // if(this.category == '' 
        //     && this.newCategory != null 
        //     && this.newCategory != ''
        //     ){
        //     return true;
        // }
        
        // if(this.subCategory == ''){
        //     return true;
        // }
        
        // return false;
    }

    protected handleAmountChanged(amount){
        var originalCategory = this.category;
        this.bestGuessCategories = this.bestGuessCategoriesPipe.transform(this.categories, amount);
        if(this.bestGuessCategories == null){
            this.bestGuessCategories = [];
        }
        this.bestGuessCategories.push(this.defaultCategory);
        this.displayCategoryDropdown = this.shouldDisplayCategoryDropdown(amount);

        // if(this.bestGuessCategories != null && this.bestGuessCategories.length > 0){
            if(this.category != this.bestGuessCategories[0].name){
                this.category = this.bestGuessCategories[0].name;
                this.handleCategoryChanged(this.category);
            }
        // }
        
        // if(originalCategory != this.category){
        // }
    }

    protected handleCategoryChanged(newValue){
        if(newValue == null){
        }
        else if(newValue != "Create new Category"){
            this.subCategories = this.bestGuessCategories.find(c => c.name == newValue).subCategories;
            if(this.subCategories == null){
                this.subCategories = [];
            }
            if(this.subCategories.find(sc => sc.name == "Create new SubCategory") == null){
                this.subCategories.push(this.defaultSubCategory);
            }
            // if(this.subCategories != null && this.subCategories.length > 0){
                this.subCategory = this.subCategories[0].name;
            // }
            // else{
            //     this.subCategory = null;
            // }
        }
        else{
            this.subCategories = [];
        }
    }

    constructor(protected bestGuessCategoriesPipe: BestGuessCategories) {
    }

    ngOnInit(){
        this.amount
            .debounceTime(300)
            .distinctUntilChanged().subscribe(a => {
                this.handleAmountChanged(a)
        });
        //remove category Subscribe due to that cause "Expression has changed after it is checked"
        //should be fixed by enable Production model
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
                if(c != null){
                    this.categoryChanged.emit(c);
                }
            });
        this.newSubCategoryControl.valueChanges
            .debounceTime(400)
            .distinctUntilChanged()
            .subscribe(s => {
                if(s != null){
                    this.subCategoryChanged.emit(s);
                }
            });
    }
}