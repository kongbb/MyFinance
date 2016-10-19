import { Component, Input, Output, EventEmitter } from "@angular/core";
// import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'date-input',
    template: `
        <div class="form-group">
            <label>Date</label>
            <input type="text" class="form-control" [(ngModel)]="dt" value="{{dt | date}}" readonly>
            <div>
                <div style="display:inline-block; min-height:290px;">
                    <datepicker [(ngModel)]="dt" [showWeeks]="true"></datepicker>
                </div>
            </div>
        </div>`
})

export class DateInputComponent {
    
    @Output() dateChanged = new EventEmitter();
    
    
    // @Input()
    // public dto: Observable<Date>
    
    @Input()
    protected date: Date;

    private _dateTime;
    set dt(value){
       this._dateTime = value;
       this.dateChanged.next(this._dateTime);
    }
    get dt(){
       return this._dateTime;
    }
        
    constructor(){
        
    }
    
    ngOnInit(){
        this._dateTime = this.date;
        // this.dto
        //     .distinctUntilChanged().subscribe(date => {
        //         //Doesn't set value through setter, as setter would trigger eventEmitter
        //         //can be avoid though
        //         this._dateTime = date;
        //     });
    }
}