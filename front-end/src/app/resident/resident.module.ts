import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {ResidentComponent} from "./resident.component";
import {RouterModule} from "@angular/router";
import {
  ResidentModificationHandicapComponent
} from "./resident-modification-handicap/resident-modification-handicap.component";
import { ResidentHandicapComponent } from './resident-handicap/resident-handicap.component';

@NgModule({
  declarations: [
    ResidentComponent,
    ResidentModificationHandicapComponent,
    ResidentHandicapComponent
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
