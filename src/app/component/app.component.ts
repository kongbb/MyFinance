import { Component, ViewContainerRef, OnInit, AfterViewInit } from "@angular/core";
import "../rxjs-operators";

@Component({
    selector: "app",
    template: `
      <router-outlet></router-outlet>`
})

export class AppComponent { 
  public constructor(private viewContainerRef: ViewContainerRef){
  }
}