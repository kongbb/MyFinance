import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';
import { Alert } from './alert';

@Component({
    selector: 'data-table',
    template: `<div class="dataTable_wrapper">
                <table class="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th *ngIf="delete"></th>
                            <th *ngFor="let t of titles">{{t}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr *ngFor="let item of dataset" class="odd gradeX">
                            <td *ngIf="delete"><button type="button" class="btn btn-danger" (click)="confirmOpen(item)">Remove</button></td>
                            <td *ngFor="let p of columns">
                                <span>{{item[p]}}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <alert (alertOutput)="confirmClose($event)"></alert>
            </div>`,
    directives: [Alert]
})

export class DataTable{
    @Input()
    columns: string[];

    @Input()
    titles: string[];
    
    @Input()
    dataset: any[]
    
    @Input()
    delete: boolean;
    
    @Output() confirmDelete = new EventEmitter();
    
    @ViewChild(Alert) alert;
    
    ngOnInit() {
        if(this.titles == null){
            this.titles = this.columns;
        }
    }

    private selectedItem: any;

    confirmOpen(item){
        this.selectedItem = item;
        this.alert.cancelButton = true;
        this.alert.okButton = true;
        this.alert.alertTitle = "Confirmation";
        this.alert.message = "You are about to delete \n" + JSON.stringify(item, this.columns);;
        this.alert.okButtonText = "Delete";
        this.alert.open();
    }

    confirmClose(){
        this.confirmDelete.next(this.selectedItem);
    }
}
