import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {EndQuizComponent} from "./end-quiz.component";

@NgModule({
  declarations: [
    EndQuizComponent
  ],
  imports: [CommonModule, RouterModule]
})
export class QuizzesModule { }
