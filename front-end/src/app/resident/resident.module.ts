import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {ResidentComponent} from "./resident.component";
import {ResidentModificationHandicapComponent} from "./resident-modification/resident-modification-handicap/resident-modification-handicap.component";
import {RouterModule} from "@angular/router";

@NgModule({
    declarations: [
        ResidentComponent,
        ResidentModificationHandicapComponent
    ],
  exports: [
    ResidentModificationHandicapComponent
  ],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class ResidentModule { }
