import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {ResidentsDisplayComponent} from "./residents-display/residents-display.component";
import {ResidentsComponent} from "./residents.component";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    ResidentsComponent,
    ResidentsDisplayComponent
  ],

    imports: [
        CommonModule,
        RouterModule
    ]
})
export class ResidentsModule { }
