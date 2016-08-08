import { Component } from "@angular/core";

@Component({
    selector: "login",
    templateUrl: "../../pages/template/login.html"
})

export class LoginComponent {
    mode: LoginMode = LoginMode.Index;
    loginMode = LoginMode;

    setMode($event, mode: LoginMode) {
        $event.preventDefault();
        this.mode = mode;
    }
}

enum LoginMode { Index, Login, Signup }