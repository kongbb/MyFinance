// Observable Version
import { Injectable }     from "@angular/core";
import { Http, Response } from "@angular/http";
import { Headers, RequestOptions } from "@angular/http";
import { Observable }     from "rxjs/Observable";

@Injectable()
export class StockService {
  constructor (private http: Http) {}

  private soldTradesUrl = "api/stocks/soldtrades";
  private holdingStocksUrl = "api/stocks/holdingstocks";

  private stockQuoteUrl = "http://quoteapi.com/api/v4/symbols/{code}.asx?appID=af5f4d73c1a54a33&averages=1&desc=1&fundamentals=1&liveness=delayed";
  getTrades (){
    return this.http.get(this.soldTradesUrl);
  }

  getHoldingStocks (){
    return this.http.get(this.holdingStocksUrl);
  }

  getQuote (code){
    var url = this.stockQuoteUrl.replace("{code}", code);
    return this.http.get(url);
  }

  private extractTradesData(res: Response) {
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
