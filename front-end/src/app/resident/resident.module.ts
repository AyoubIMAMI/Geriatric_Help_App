import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {ResidentComponent} from "./resident.component";
import {RouterModule} from "@angular/router";
import {
  ResidentProfileModificationComponent
} from "./resident-profile-modification/resident-profile-modification.component";
import {
  ResidentModificationHandicapComponent
} from "./resident-modification-handicap/resident-modification-handicap.component";

@NgModule({
  declarations: [
    ResidentComponent,
    ResidentProfileModificationComponent,
    ResidentModificationHandicapComponent
  ],
  exports: [
    ResidentProfileModificationComponent,
    ResidentModificationHandicapComponent
  ],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class ResidentModule { }
