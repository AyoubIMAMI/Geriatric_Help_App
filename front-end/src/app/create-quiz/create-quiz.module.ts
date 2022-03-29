import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {CreateQuizComponent} from "./create-quiz.component";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    CreateQuizComponent
  ],

  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class CreateQuizModule {}
