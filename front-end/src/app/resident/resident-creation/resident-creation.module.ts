import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ResidentCreationComponent} from "./resident-creation.component";
import {ResidentModule} from "../resident.module";

@NgModule({
  declarations: [
    ResidentCreationComponent,
  ],
  imports: [CommonModule, RouterModule, ResidentModule]
})
export class ResidentCreationModule{

}
