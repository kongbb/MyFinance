import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/RX';
import { GoogleApiHelper } from "../common/gapi";
//gapi is imported at page level by script tag, don't know how to load from SystemJs
// declare var gapi: any;

@Injectable()
export class LoginStatusStore {
  constructor(private google: GoogleApiHelper){
    
  }

  get isSignedIn(){
    return this.google.isSignedIn;
  }

  get userName(){
    return this.google.userName;
  }

  // init(){
  //   this.google.load();
  //   this.google.isSignedIn.subscribe((t: boolean) => {
  //     this._isSignedIn.next(t);
  //   });
  // }

  // load(){
  //   gapi.load('client:auth2', () => { this.initClient(); });
  // }

  // initClient(){
  //   gapi.client.init({
  //       // apiKey: 'YOUR_API_KEY',
  //       discoveryDocs: ["https://people.googleapis.com/$discovery/rest?version=v1"],
  //       clientId: '1005942748616-gn1b79gm1dvv800q3pjtk7e0rh8n1loi.apps.googleusercontent.com',
  //       scope: 'profile'
  //   }).then(this.afterInit);
  // }

  // afterInit(){
  //   // Listen for sign-in state changes.
  //   gapi.auth2.getAuthInstance().isSignedIn.listen((isSignedIn: boolean) => { this.updateSigninStatus(isSignedIn); });

  //   // Handle the initial sign-in state.
  //   this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
  // }

  // private updateSigninStatus(signedIn: boolean){
  //   this._isSignedIn.next(signedIn);
  // }

  // test(){
  //   this.google.handleAuthClick();
  //   //this.google.updateSigninStatus(true);
  // }
  
  // handleAuthClick(event) {
  //   gapi.auth2.getAuthInstance().signIn();
  // }

  // handleSignoutClick(event) {
  //   gapi.auth2.getAuthInstance().signOut();
  // }

  // makeApiCall() {
  //   gapi.client.people.people.get({
  //     resourceName: 'people/me'
  //   }).then(function(resp) {
  //     console.log('Hello, ' + resp.result.names[0].givenName);
  //   }, function(reason) {
  //     console.log('Error: ' + reason.result.error.message);
  //   });
  // }
}