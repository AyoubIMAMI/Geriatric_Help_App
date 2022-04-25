import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {GestionQuizComponent} from "./gestion-quiz.component";
import {RechercheQuizDisplayComponent} from "./recherche-quiz-display/recherche-quiz-display.component";


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
