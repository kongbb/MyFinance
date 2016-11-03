import { Component, ViewChild, Input, Output, EventEmitter } from "@angular/core";
import { ModalDirective } from "ng2-bootstrap";

@Component({
    selector: "modal",
    templateUrl: "../../pages/template/modal.html"
})

export class ModalComponent {
    @ViewChild("confirmModal")
    public confirmModal: ModalDirective

    @Input()
    title: string;

    @Input()
    message: string;

    @Input()
    arg: any;

    @Output() action = new EventEmitter();

    public show(): void{
        this.confirmModal.show();
    }

    public hide(): void{
        this.confirmModal.hide();
    }

    confirmAction(){
        this.action.next();
        this.confirmModal.hide();
    }
}
