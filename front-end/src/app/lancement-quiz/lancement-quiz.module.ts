import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {RechercheQuizDisplayComponent} from "./recherche-quiz-display/recherche-quiz-display.component";
import {LancementQuizComponent} from "./lancement-quiz.component";


@NgModule({
  declarations: [
    LancementQuizComponent,
    RechercheQuizDisplayComponent
  ],

  imports: [
    CommonModule,
    RouterModule
  ]
})
export class LancementQuizModule {}
