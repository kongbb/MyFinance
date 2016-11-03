import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';
import { ModalComponent } from "./modal.component";

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
                            <td *ngIf="delete"><button type="button" class="btn btn-danger" (click)="showDeleteConfirmation(item)">Remove</button></td>
                            <td *ngFor="let p of columns">
                                <span>{{item[p]}}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <modal (action)="doDelete()"></modal>
            </div>`,
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

    @ViewChild(ModalComponent)
    public deleteConfirmation: ModalComponent;

    @Output() confirmDelete = new EventEmitter();
    
    ngOnInit() {
        if(this.titles == null){
            this.titles = this.columns;
        }
    }

    private selectedItem: any;

    showDeleteConfirmation(item){
        this.selectedItem = item;
        this.deleteConfirmation.title = "Confirmation";
        this.deleteConfirmation.message = "You are about to delete \n" + JSON.stringify(item, this.columns);
        this.deleteConfirmation.show();
    }

    doDelete(){
        this.confirmDelete.next(this.selectedItem);
    }
}
