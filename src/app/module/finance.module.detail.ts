import { FinanceComponent } from "../component/finance.component";
import { NavigationComponent } from "../component/navigation.component";
import { StocksComponent } from "../component/stocks.component";
import { TransactionsComponent } from "../component/transactions.component";
import { Categories } from "../component/categories.component";
import { MatchTransaction } from "../pipes/match-transaction.pipe";
import { BestGuessCategories } from "../pipes/best-guess-categories.pipe";
import { DateMatchTransactionPipe } from "../pipes/date-match.pipe";
export const financeComponents = [
    FinanceComponent,
    NavigationComponent,
    StocksComponent,
    TransactionsComponent,
    Categories
];

export const financePipes = [
    MatchTransaction,
    BestGuessCategories,
    DateMatchTransactionPipe
];

export const financeDirectives = [];
