import { TransactionType } from "./transaction-type";

export class User {
  name: string;
  stockTracking: boolean;
  transactionTypes: Array<TransactionType>
}