import { Component, ViewChild, OnInit, OnDestroy } from "@angular/core";
import { UserStore } from "../dataStores/user.store";
import { GoogleApiHelper } from "../common/gapi";

@Component({
    selector: "home",
    templateUrl: "../../pages/template/index.html"
})

export class HomeComponent implements OnInit, OnDestroy {
    public userName: string;
    constructor(private store: UserStore){
    }

    ngOnInit(){
        // this.store.userName.subscribe(name => { 
        //     this.userName = name; 
        // })
    }

    ngOnDestroy(){
        
    }

    login(){

    }
}
