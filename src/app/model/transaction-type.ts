export class TransactionType {
  code: string;
  displayName: string;
  includeGST: boolean;

  constructor(code: string, displayName: string, includeGST: boolean){
    this.code = code;
    this.displayName = displayName;
    this.includeGST = includeGST;
  }
}