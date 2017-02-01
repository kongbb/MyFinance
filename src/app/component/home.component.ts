import { Component, ViewChild, OnInit, OnDestroy } from "@angular/core";
import { LoginStatusStore } from "../dataStores/login-status.store";
import { GoogleApiHelper } from "../common/gapi";

@Component({
    selector: "home",
    templateUrl: "../../pages/template/index.html",
    providers: [LoginStatusStore, GoogleApiHelper]
})

export class HomeComponent implements OnInit, OnDestroy {
    public userName: string;
    constructor(private store: LoginStatusStore){
    }

    ngOnInit(){
        // this.store.userName.subscribe(name => { 
        //     this.userName = name; 
        // })
    }

    ngOnDestroy(){
        
    }

    signInGoogle(){

    }
}
