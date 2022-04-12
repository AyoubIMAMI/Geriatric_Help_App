import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {QuizComponent} from "./quiz.component";
import {StartQuizComponent} from "./start-quiz/start-quiz.component";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    QuizComponent,
    StartQuizComponent
  ],
  imports: [
      CommonModule,
      RouterModule
  ]
})
export class QuizModule { }
