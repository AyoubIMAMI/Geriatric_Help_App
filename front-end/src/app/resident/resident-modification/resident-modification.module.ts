import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ResidentModificationComponent} from "./resident-modification.component";
import {ResidentModule} from "../resident.module";
import {
  ResidentModificationHandicapComponent
} from "./resident-modification-handicap/resident-modification-handicap.component";

@NgModule({
  declarations: [
    ResidentModificationHandicapComponent,
    ResidentModificationComponent
  ],
  imports: [CommonModule, RouterModule, ResidentModule]
})
export class ResidentModificationModule { }
