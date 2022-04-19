import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {ResidentComponent} from "./resident.component";
import {RouterModule} from "@angular/router";
import {
  ResidentModificationHandicapComponent
} from "./resident-modification-handicap/resident-modification-handicap.component";

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
