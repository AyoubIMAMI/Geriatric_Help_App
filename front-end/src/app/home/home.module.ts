import { NgModule } from '@angular/core';
import {HomeComponent} from "./home.component";
import {CommonModule} from "@angular/common";
import {LastQuizCardComponent} from "./last-quiz-card/last-quiz-card.component";

@NgModule({
  declarations: [
    HomeComponent,
    LastQuizCardComponent
  ],
  imports: [CommonModule]
})
export class HomeModule { }
