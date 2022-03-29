import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ResidentComponent} from "../resident.component";
import {ResidentModificationComponent} from "./resident-modification.component";
import {ResidentModule} from "../resident.module";

@NgModule({
  declarations: [
    ResidentComponent,
    ResidentModificationComponent
  ],
  imports: [CommonModule, RouterModule, ResidentModule]
})
export class ResidentModificationModule { }
