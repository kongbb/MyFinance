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
let Modal = class Modal {
    constructor(dcl, _elementRef) {
        this.dcl = dcl;
        this._elementRef = _elementRef;
        this.okButton = true;
        this.okButtonText = 'Ok';
        this.cancelButton = true;
        this.cancelButtonText = 'Cancel';
        this.modalMessage = true;
        this.modalFooter = true;
        this.modalHeader = true;
        this.isOpen = false;
        this.modalOutput = new core_1.EventEmitter();
    }
    open(component) {
        this.isOpen = true;
        if (component) {
            this.component = this.dcl.loadIntoLocation(component, this._elementRef, "child");
        }
    }
    close(data) {
        this.dispose();
        if (data) {
            this.modalOutput.emit(data);
        }
    }
    submit() {
        this.dispose();
        this.modalOutput.emit(true);
    }
    dispose() {
        this.isOpen = false;
        if (this.component != undefined) {
            this.component.then((componentRef) => {
                componentRef.dispose();
                return componentRef;
            });
        }
    }
};
__decorate([
    core_1.Output(), 
    __metadata('design:type', core_1.EventEmitter)
], Modal.prototype, "modalOutput", void 0);
Modal = __decorate([
    core_1.Component({
        selector: 'modal',
        template: `
  <div class="modal fade" [open]="!isOpen" id="myModal" [attr.data-keyboard]="true" [attr.data-backdrop]="false" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header" [hidden]=!modalHeader>
          <button type="button" class="close" data-dismiss="modal" (click)='close()' aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title text-center" id="myModalLabel">{{modalTitle}}</h4>
        </div>
        <div class="modal-body">
        <div [hidden]=!modalMessage>
        {{message}}
        </div>
          <div #child>
          </div>
        </div>
        <div class="modal-footer" [hidden]=!modalFooter>
        <span [hidden]=!okButton >
          <button [hidden]=!okButton class="btn btn-primary" (click)="submit()">{{okButtonText}}</button>
          </span>
          <span [hidden]=!cancelButton >
          <button [hidden]=!cancelButton class="btn btn-primary" (click)="close()">{{cancelButtonText}}</button>
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
], Modal);
exports.Modal = Modal;
var _a;
//# sourceMappingURL=modal.js.map