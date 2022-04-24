import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {QuizzesDisplayComponent} from "./quizzes-display/quizzes-display.component";
import {QuizzesComponent} from "./quizzes.component";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    QuizzesComponent,
    QuizzesDisplayComponent,
  ],

    imports: [
        CommonModule,
        RouterModule
    ]
})
export class QuizzesModule { }
