import { StockTrade } from "../model/stock-trade";

export class CommsecCSV {
    public IsValid(content: string): boolean{
        if(content == null){
            return false;
        }
        
        var lines = content.split("\n");
        if(lines.length == 0){
            return false;
        }

        var columns = lines[0].split(",");
        if(columns.length < 7){
            return false;
        }

        if(columns[0] != "Date" || columns[1] != "Reference" || columns[2] != "Type" 
        || columns[3] != "Detail" || columns[4] != "Debit ($)" 
        || columns[5] != "Credit ($)" || columns[6] != "Balance ($)"){
            return false;
        }

        // if(columns[0] != "Confirmation Number" || columns[1] != "Order Number" || columns[2] != "Trade Date" 
        // || columns[3] != "Buy/ Sell" || columns[4] != "Security" 
        // || columns[5] != "Units" || columns[6] != "Average Price ($)" || columns[7] != "Brokerage (inc GST.)" 
        // || columns[8] != "Net Proceeds ($)" || columns[9] != "Settlement Date" || columns[10] != "Confirmation Status"){
        //     return false;
        // }

        return true;
    }

    public extractData(content: string): StockTrade[]{
        var lines = content.split("\n");
        var count = lines.length - 1;
        
        lines.splice(0, 1);
        lines = lines.filter( t => { return t.split(",").length >= 7 && t.split(",")[2] == "Contract"; } );
        var trades = lines.map(function(line: string, index: number){
            var f = line.split(",");
            if(f.length >= 7 && f[2] == "Contract"){
              var details = f[3].split(" ");
              var code = details[2];
              var bs = details[0];
              var units = Number.parseInt(details[1]);
              var price = Number.parseFloat(details[4]);

              var ref = f[1];
              var date = f[0];
              var netAmount = 0;
              var brokerage = 0;
              if(bs == "B"){
                  netAmount = Number.parseFloat(f[4]);
                  brokerage = netAmount - units * price;
              }
              else{
                  netAmount = Number.parseFloat(f[5]);
                  brokerage = units * price - netAmount;
              }
              
              return new StockTrade(null, code, ref, bs, units, price, brokerage, netAmount, date, null, null, null);
            }
        });

        return trades;
    }
}