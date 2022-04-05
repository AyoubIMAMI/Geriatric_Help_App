import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {CreateQuizComponent} from "./create-quiz.component";
import {ReactiveFormsModule} from "@angular/forms";
import {CreationOfQuizComponent} from "./creation-of-quiz/creation-of-quiz.component";
import {AddingQuestionsComponent} from "./adding-questions/adding-questions.component";
import {createNewQuestionComponent} from "./create-new-question/create-new-question.component";

@NgModule({
  declarations: [
    CreateQuizComponent,
    CreationOfQuizComponent,
    AddingQuestionsComponent,
    createNewQuestionComponent
  ],

  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class CreateQuizModule {}
