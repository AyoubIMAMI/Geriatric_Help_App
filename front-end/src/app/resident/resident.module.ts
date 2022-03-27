import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {ResidentComponent} from "./resident.component";
import {ResidentModificationHandicapComponent} from "./resident-modification/resident-modification-handicap/resident-modification-handicap.component";

@NgModule({
  declarations: [
    ResidentComponent,
    ResidentModificationHandicapComponent
  ],
  imports: [CommonModule]
})
export class ResidentModule { }
