import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {AddingQuestionsComponent} from "./adding-questions/adding-questions.component";
import {createNewQuestionComponent} from "./create-new-question/create-new-question.component";
import { CommonModule } from '@angular/common';
import {ModificationQuizComponent} from "./modification-quiz.component";
import {ModificationOfQuizComponent} from "./modification-of-quiz/modification-of-quiz.component";


@NgModule({
  declarations: [
    ModificationQuizComponent,
    ModificationOfQuizComponent,
    AddingQuestionsComponent,
    createNewQuestionComponent
  ],

  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class ModificationQuizModule {}
