import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ResidentModificationComponent} from "./resident-modification.component";
import {ResidentModule} from "../resident.module";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    ResidentModificationComponent,
  ],
  imports: [CommonModule, RouterModule, ResidentModule, ReactiveFormsModule]
})
export class ResidentModificationModule { }
