import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {RechercheQuizDisplayComponent} from "./recherche-quiz-display/recherche-quiz-display.component";
import {GestionQuizComponent} from "./gestion-quiz.component";


@NgModule({
  declarations: [
    GestionQuizComponent,
    RechercheQuizDisplayComponent
  ],

  imports: [
    CommonModule,
    RouterModule
  ]
})
export class GestionQuizModule {}
