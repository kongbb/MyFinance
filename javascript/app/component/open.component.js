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
let Open = class Open {
    constructor() {
        this.isExpanded = true;
    }
    set open(value) {
        this.isExpanded = value;
        this.toggle();
    }
    get open() {
        return this.isExpanded;
    }
    toggle() {
        if (this.isExpanded) {
            this.hide();
        }
        else {
            this.show();
        }
    }
    hide() {
        this.isExpanded = false;
        this.display = 'none';
        let backDrop = document.getElementsByClassName("modal-backdrop");
        if (backDrop.length > 0) {
            document.body.removeChild(backDrop[0]);
        }
    }
    show() {
        let backDrop = document.createElement('div');
        backDrop.className = "modal-backdrop fade in";
        document.body.appendChild(backDrop);
        this.isExpanded = true;
        this.display = 'block';
    }
};
__decorate([
    core_1.HostBinding('style.display'), 
    __metadata('design:type', String)
], Open.prototype, "display", void 0);
__decorate([
    core_1.HostBinding('class.in'),
    core_1.HostBinding('attr.aria-expanded'), 
    __metadata('design:type', Boolean)
], Open.prototype, "isExpanded", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Boolean), 
    __metadata('design:paramtypes', [Boolean])
], Open.prototype, "open", null);
Open = __decorate([
    core_1.Directive({ selector: '[open]' }), 
    __metadata('design:paramtypes', [])
], Open);
exports.Open = Open;
