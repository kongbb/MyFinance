import { Component, ViewChild } from "@angular/core";
import { UserService } from "../service/user.service";
import { User } from "../model/user";
import { ModalDirective } from "ng2-bootstrap";
import { ModalComponent } from "../component/modal.component";

@Component({
    selector: "home",
    //template: "<h1>Hello Home</h1>"
    templateUrl: "../../pages/template/index.html"
})

export class HomeComponent {
    username: string;
    password: string;

    login(){
        
    }
}
