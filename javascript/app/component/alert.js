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
const open_component_1 = require('./open.component');
let Alert = class Alert {
    constructor(dcl, _elementRef) {
        this.dcl = dcl;
        this._elementRef = _elementRef;
        this.okButton = true;
        this.okButtonText = 'Ok';
        this.cancelButton = true;
        this.cancelButtonText = 'Cancel';
        this.alertMessage = true;
        this.alertFooter = true;
        this.alertHeader = true;
        this.isOpen = false;
        this.alertOutput = new core_1.EventEmitter();
    }
    open() {
        this.isOpen = true;
    }
    ok() {
        this.isOpen = false;
        this.alertOutput.emit(true);
    }
    cancel() {
        this.isOpen = false;
    }
};
__decorate([
    core_1.Output(), 
    __metadata('design:type', core_1.EventEmitter)
], Alert.prototype, "alertOutput", void 0);
Alert = __decorate([
    core_1.Component({
        selector: 'alert',
        template: `
  <div class="modal fade" [open]="!isOpen" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header" [hidden]=!alertHeader>
          <button type="button" class="close" data-dismiss="modal" (click)='cancel()' aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title text-center" id="myModalLabel">{{alertTitle}}</h4>
        </div>
        <div class="modal-body">
          <div [hidden]=!alertMessage>
          {{message}}
          </div>
        </div>
        <div class="modal-footer" [hidden]=!alertFooter>
        <span [hidden]=!okButton >
          <button class="btn btn-primary" (click)="ok()">{{okButtonText}}</button>
          </span>
          <span [hidden]=!cancelButton>
          <button class="btn btn-primary" (click)="cancel()">{{cancelButtonText}}</button>
          </span>
        </div>
      </div>
    </div>
  </div>
  `,
        providers: [],
        directives: [open_component_1.Open],
        encapsulation: core_1.ViewEncapsulation.None,
        pipes: []
    }), 
    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.DynamicComponentLoader !== 'undefined' && core_1.DynamicComponentLoader) === 'function' && _a) || Object, core_1.ElementRef])
], Alert);
exports.Alert = Alert;
var _a;
