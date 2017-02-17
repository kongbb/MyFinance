import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { TransactionService } from "../service/transaction.service";
import { UserStore } from "../dataStores/user.store";
import { TransactionType } from "../model/transaction-type";

@Injectable()
export class TransactionTypeResolver implements Resolve<TransactionType> {

  constructor(private userStore: UserStore) {}

  resolve(route: ActivatedRouteSnapshot) {
    var typeCode = route.params["type"];
    return this.userStore.getTransactionType(typeCode);
  }
}