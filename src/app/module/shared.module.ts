import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FileUploadModule } from "ng2-file-upload";
import { FileUploader } from "ng2-file-upload";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule, JsonpModule } from "@angular/http";
import { Routes, RouterModule, Router } from "@angular/router";

import { Ng2BootstrapModule } from "ng2-bootstrap";
import { DatepickerModule } from 'ng2-bootstrap/ng2-bootstrap';

// components
import { DataTable } from "../component/data-table.component";
import { NavigationComponent } from "../component/navigation.component";
import { DateInputComponent } from "../component/date-input.component";
import { ModalComponent } from "../component/modal.component";
//import { UPLOAD_DIRECTIVES } from "ng2-uploader";

@NgModule({
  imports: [
    // routing,
    HttpModule,
    // JsonpModule,
    // InMemoryWebApiModule.forRoot(UserData),
    FileUploadModule,
    DatepickerModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    Ng2BootstrapModule
  ],
  declarations: [
    DataTable,
    NavigationComponent,
    DateInputComponent,
    ModalComponent,
  ],
  exports: [
      DataTable,
      NavigationComponent,
      DateInputComponent,
      ModalComponent,
      FileUploadModule,
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      HttpModule,
      RouterModule,
      Ng2BootstrapModule
  ],
  providers: [
  ]
})
export class SharedModule { }