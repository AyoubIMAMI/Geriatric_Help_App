import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {GestionQuizComponent} from "./gestion-quiz.component";


@NgModule({
  declarations: [
    GestionQuizComponent
  ],

  imports: [
    CommonModule,
    RouterModule
  ]
})
export class GestionQuizModule {}
