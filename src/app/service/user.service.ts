// Observable Version
import { Injectable }     from "@angular/core";
import { Http, Response } from "@angular/http";
import { Headers, RequestOptions } from "@angular/http";

import { User }           from "../model/user";
import { Observable }     from "rxjs/Observable";

@Injectable()
export class UserService {
  constructor (private http: Http) {}

  private usersUrl = "app/users";  // URL to web API

  getUsers (): Observable<User[]> {
    return this.http.get(this.usersUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  addUser (name: string): Observable<User> {
    let body = JSON.stringify({ name });
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.usersUrl, body, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We"d also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : "Server error";
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}