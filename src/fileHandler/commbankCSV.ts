import * as moment from 'moment';
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
        if(columns.length < 4){
            return false;
        }

        return this.isValidLine(lines[0]);
    }

    public extractData(content: string): Transaction[]{
        var lines = content.split("\n");
        var count = lines.length;
        
        lines = lines.filter( t => { return this.isValidLine(t); } );
        var trans = lines.map((line: string, index: number) => {
            return this.transactionFromLine(line);
        });

        return trans;
    }

    private isValidLine(str: string): boolean{
        var i, flag = false;
        for(i = 0; i < str.length; i++){
            if(str[i] == "\""){
                flag = !flag;
            }
            if(str[i] == "," && flag){
                str = str.substr(0, i) + " " + str.substr(i + 1, str.length - i - 1);
            }
        }
        var vs = str.split(",");
        if(vs.length < 4){
            return false;
        }
        return moment(vs[0], "DD/MM/YYYY").isValid() && !isNaN(this.parseFloat(vs[1])) && !isNaN(this.parseFloat(vs[3]));
    }

    private transactionFromLine(str: string): Transaction{
        var vs = str.split(",");
        return new Transaction(null, null, null, moment(vs[0], "DD/MM/YYYY").toDate(), this.parseFloat(vs[1]), Math.round(this.parseFloat(vs[1]) * 10) / 100, null, null, this.removeDoubleQuotes(vs[2]), null);
    }

    private parseFloat(str: string): number{
        var t: string = this.removeDoubleQuotes(str);
        return parseFloat(t);
    }

    private removeDoubleQuotes(str: string): string{
        var t: string = str.trim();
        if (t.length >= 2 ){
            if(t[0] == '"' && t[t.length - 1] == '"'){
                t = t.substring(1, t.length - 2);
            }
        }
        return t;
    }
}