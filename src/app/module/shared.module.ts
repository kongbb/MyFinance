import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FileUploader } from "ng2-file-upload";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule, JsonpModule } from "@angular/http";
import { Routes, RouterModule, Router } from "@angular/router";

import { DatepickerModule } from 'ng2-bootstrap/ng2-bootstrap';

// components
import { Open } from "../component/open.component";
import { Alert } from "../component/alert";
import { DataTable } from "../component/data-table.component";
import { NavigationComponent } from "../component/navigation.component";
import { DateInputComponent } from "../component/date-input.component";
//import { UPLOAD_DIRECTIVES } from "ng2-uploader";

@NgModule({
  imports: [
    // routing,
    HttpModule,
    // JsonpModule,
    // InMemoryWebApiModule.forRoot(UserData),
    DatepickerModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    Open,
    Alert,
    DataTable,
    NavigationComponent,
    DateInputComponent
    // FileUploader
    //UPLOAD_DIRECTIVES
  ],
  exports: [
      Open,
      Alert,
      DataTable,
      NavigationComponent,
      DateInputComponent,
      // FileUploader
      //UPLOAD_DIRECTIVES,
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      HttpModule,
      RouterModule
  ],
  providers: [
  ]
})
export class SharedModule { }