import { Transaction } from "../model/transaction";

export class CommbankCSV {
    public IsValid(content: string): boolean{
        if(content == null){
            return false;
        }
        
        var lines = content.split("\n");
        if(lines.length == 0){
            return false;
        }

        var columns = lines[0].split(",");
        if(columns.length < 11){
            return false;
        }

        if(columns[0] != "Confirmation Number" || columns[1] != "Order Number" || columns[2] != "Trade Date" 
        || columns[3] != "Buy/ Sell" || columns[4] != "Security" 
        || columns[5] != "Units" || columns[6] != "Average Price ($)" || columns[7] != "Brokerage (inc GST.)" 
        || columns[8] != "Net Proceeds ($)" || columns[9] != "Settlement Date" || columns[10] != "Confirmation Status"){
            return false;
        }

        return true;
    }

    public extractData(content: string): Transaction[]{
        var lines = content.split("\n");
        var count = lines.length - 1;
        
        lines.splice(0, 1);
        lines = lines.filter( t => { return t.split(",").length >= 11; } );
        var trans = lines.map(function(line: string, index: number){
            var f = line.split(",");
            if(f.length >= 11){
              return new Transaction(null, null, null, null, null, null, null, null, null, null);
              //return new StockTrade(null, f[4], f[1], f[3], Number.parseInt(f[5]), Number.parseFloat(f[6]), Number.parseFloat(f[7]), Number.parseFloat(f[8]), f[2], f[0], f[10], f[9]);
            }
        });

        return trans;
    }
}