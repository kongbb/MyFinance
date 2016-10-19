import { FinanceComponent } from "../component/finance.component";
import { StocksComponent } from "../component/stocks.component";
import { CompanyTransactionsComponent } from "../component/company-transactions.component";
import { Categories } from "../component/categories.component";
import { MatchTransaction } from "../pipes/match-transaction.pipe";
import { BestGuessCategories } from "../pipes/best-guess-categories.pipe";
import { DateMatchTransactionPipe } from "../pipes/date-match.pipe";
export const financeComponents = [
    FinanceComponent,
    StocksComponent,
    CompanyTransactionsComponent,
    Categories
];

export const financePipes = [
    MatchTransaction,
    BestGuessCategories,
    DateMatchTransactionPipe
];

export const financeDirectives = [];
