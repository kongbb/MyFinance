import { Subject } from 'rxjs/RX';
import { Observable } from 'rxjs/Observable';
//gapi is imported at page level by script tag, don't know how to load from SystemJs
declare var gapi: any;

export class GoogleApiHelper {
  private _isSignedIn : boolean;
  // private _userName: string;
  // private _isSignedIn : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _userName: Subject<string> = new Subject<string>();
  
  constructor(){
    this.updateUserName("God");
    this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    this.makeApiCall();
  }

  updateSigninStatus(isSignedIn: boolean){
    this._isSignedIn = isSignedIn;
  }

  updateUserName(name: string){
    this._userName.next(name);
  }

  get isSignedIn() {
    return this._isSignedIn;
  }

  get userName() {
    return this._userName.asObservable();
  }

  handleAuthClick() {
    gapi.auth2.getAuthInstance().signIn();
  }

  handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
  }

  makeApiCall() {
    gapi.client.people.people.get({
      resourceName: 'people/me'
    }).then((resp) => { this.updateUserName(resp.result.names[0].givenName); });
  }

  // load(){
    // this.updateSigninStatus(true);
    // gapi.load('client:auth2', () => { this.initClient(); });
    // Promise.all([this.loadGapiClient]).then(() => {
    //   var t = gapi.auth2.getAuthInstance().isSignedIn.get();
    //   this.updateSigninStatus(t); 
    // });
    // this.loadGapiClient.then(() => { this.initClient(); }).then(() => { this.test(); });
  // }

  // private loadGapiClient = new Promise(function(resolve, reject) {
  //   gapi.load('client:auth2', resolve);
  // });

  // initClient(){
    
  //   gapi.client.init({
  //       // apiKey: 'YOUR_API_KEY',
  //       discoveryDocs: ["https://people.googleapis.com/$discovery/rest?version=v1"],
  //       clientId: '1005942748616-gn1b79gm1dvv800q3pjtk7e0rh8n1loi.apps.googleusercontent.com',
  //       scope: 'profile'
  //   }).then(() => { this.afterInit(); })
    // .then(() => { 
    //   // this.updateSigninStatus(false);
    //   var t = gapi.auth2.getAuthInstance().isSignedIn.get();
    //   this.updateSigninStatus(t); 
    // })
  //   ;
  // }

  // afterInit(){
    // Listen for sign-in state changes.
    // gapi.auth2.getAuthInstance().isSignedIn.listen((isSignedIn: boolean) => { this.updateSigninStatus(isSignedIn); });
    // this._isSignedIn = new BehaviorSubject<boolean>(false);
    // this.updateSigninStatus(true);
    // Handle the initial sign-in state.
    //this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
  // }
}
