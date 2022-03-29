import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {ResidentComponent} from "./resident.component";
import {RouterModule} from "@angular/router";

@NgModule({
    declarations: [
        ResidentComponent
    ],
  exports: [
  ],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class ResidentModule { }
