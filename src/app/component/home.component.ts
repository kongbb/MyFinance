import { Component, ViewChild } from "@angular/core";
import { UserService } from "../service/user.service";
import { User } from "../model/user";
import { ModalDirective } from "ng2-bootstrap";
import { ModalComponent } from "../component/modal.component";

@Component({
    selector: "home",
    //template: "<h1>Hello Home</h1>"
    templateUrl: "../../pages/template/index.html",
    providers: [UserService]
})

export class HomeComponent {
    errorMessage: string;
    users: User[];
    @ViewChild(ModalComponent) lgModal: ModalComponent;

    constructor (private userService: UserService) {}

    public show(): void{
        this.lgModal.show();
    }

    public hide(): void{
        this.lgModal.hide();
    }

    ngOnInit() {
        //this.getUsers();
    }

    getUsers() {
        this.userService.getUsers()
                            .subscribe(
                                users => this.users = users,
                                error => this.errorMessage = <any>error
                            );
    }
}
