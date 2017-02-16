import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { TransactionService } from "../service/transaction.service";
import { TransactionStore } from "../dataStores/transaction.store";

@Injectable()
export class TransactionStoreResolver implements Resolve<TransactionStore> {

  constructor(private service: TransactionService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return new TransactionStore(this.service, route.params["type"]);
  }
}