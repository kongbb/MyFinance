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
    name: string;

    @Input()
    title: string;

    @Input()
    buttons: string[];

    @Input()
    message: string;

    @Input()
    arg: any;

    @Output() actions = new EventEmitter();

    public defaultActionOnly: boolean;

    public show(): void{
        this.confirmModal.show();
    }

    public hide(): void{
        this.confirmModal.hide();
    }

    public takeActions(i: number){
        this.hide();
        this.actions.emit({index: i});
    }
}
