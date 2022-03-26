import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {ResidentsDisplayComponent} from "./residents-display/residents-display.component";
import {ResidentsComponent} from "./residents.component";


@NgModule({
  declarations: [
    ResidentsComponent,
    ResidentsDisplayComponent
  ],

  imports: [
    CommonModule
  ]
})
export class ResidentsModule { }
