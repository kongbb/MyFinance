import { Component } from "@angular/core";
import { UserService } from "../service/user.service";
import { User } from "../model/user";

@Component({
    selector: "home",
    //template: "<h1>Hello Home</h1>"
    templateUrl: "../../pages/template/home.html",
    providers: [UserService]
})

export class HomeComponent {
    errorMessage: string;
    users: User[];

    constructor (private userService: UserService) {}

    ngOnInit() {
        this.getUsers();
    }

    getUsers() {
        this.userService.getUsers()
                            .subscribe(
                                users => this.users = users,
                                error => this.errorMessage = <any>error
                            );
    }
}
