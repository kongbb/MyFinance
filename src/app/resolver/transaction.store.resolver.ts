import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { TransactionService } from "../service/transaction.service";
import { TransactionStore } from "../dataStores/transaction.store";
import { UserStore } from "../dataStores/user.store";

@Injectable()
export class TransactionStoreResolver implements Resolve<TransactionStore> {

  constructor(private service: TransactionService, private userStore: UserStore) {}

  resolve(route: ActivatedRouteSnapshot) {
    var typeCode = route.params["type"];
    var type = this.userStore.getTransactionType(typeCode);
    return new TransactionStore(this.service, type);
  }
}