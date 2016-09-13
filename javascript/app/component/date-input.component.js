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
const common_1 = require('@angular/common');
const ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
let DateInputComponent = class DateInputComponent {
    constructor() {
        this.dateChanged = new core_1.EventEmitter();
    }
    set dt(value) {
        this._dateTime = value;
        this.dateChanged.next(this._dateTime);
    }
    get dt() {
        return this._dateTime;
    }
    ngOnInit() {
        this._dateTime = this.date;
    }
};
__decorate([
    core_1.Output(), 
    __metadata('design:type', Object)
], DateInputComponent.prototype, "dateChanged", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Date)
], DateInputComponent.prototype, "date", void 0);
DateInputComponent = __decorate([
    core_1.Component({
        selector: 'date-input',
        template: `
        <div class="form-group">
            <label>Date</label>
            <input type="text" class="form-control" [(ngModel)]="dt" value="{{dt | date}}" readonly>
            <div>
                <div style="display:inline-block; min-height:290px;">
                    <datepicker [(ngModel)]="dt" [showWeeks]="true"></datepicker>
                </div>
            </div>
        </div>`,
        directives: [ng2_bootstrap_1.DATEPICKER_DIRECTIVES, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES]
    }), 
    __metadata('design:paramtypes', [])
], DateInputComponent);
exports.DateInputComponent = DateInputComponent;
//# sourceMappingURL=date-input.component.js.map