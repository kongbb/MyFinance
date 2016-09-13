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
const alert_1 = require('./alert');
let DataTable = class DataTable {
    constructor() {
        this.confirmDelete = new core_1.EventEmitter();
    }
    ngOnInit() {
        if (this.titles == null) {
            this.titles = this.columns;
        }
    }
    confirmOpen(item) {
        this.selectedItem = item;
        this.alert.cancelButton = true;
        this.alert.okButton = true;
        this.alert.alertTitle = "Confirmation";
        this.alert.message = "You are about to delete \n" + JSON.stringify(item, this.columns);
        ;
        this.alert.okButtonText = "Delete";
        this.alert.open();
    }
    confirmClose() {
        this.confirmDelete.next(this.selectedItem);
    }
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', Array)
], DataTable.prototype, "columns", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Array)
], DataTable.prototype, "titles", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Array)
], DataTable.prototype, "dataset", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Boolean)
], DataTable.prototype, "delete", void 0);
__decorate([
    core_1.Output(), 
    __metadata('design:type', Object)
], DataTable.prototype, "confirmDelete", void 0);
__decorate([
    core_1.ViewChild(alert_1.Alert), 
    __metadata('design:type', Object)
], DataTable.prototype, "alert", void 0);
DataTable = __decorate([
    core_1.Component({
        selector: 'data-table',
        template: `<div class="dataTable_wrapper">
                <table class="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th *ngIf="delete"></th>
                            <th *ngFor="let t of titles">{{t}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr *ngFor="let item of dataset" class="odd gradeX">
                            <td *ngIf="delete"><button type="button" class="btn btn-danger" (click)="confirmOpen(item)">Remove</button></td>
                            <td *ngFor="let p of columns">
                                <span>{{item[p]}}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <alert (alertOutput)="confirmClose($event)"></alert>
            </div>`,
    }), 
    __metadata('design:paramtypes', [])
], DataTable);
exports.DataTable = DataTable;
//# sourceMappingURL=data-table.component.js.map