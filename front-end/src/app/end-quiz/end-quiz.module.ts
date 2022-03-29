import { NgModule } from '@angular/core';
import {HomeComponent} from "./home.component";
import {CommonModule} from "@angular/common";
import {LastQuizCardComponent} from "./last-quiz-card/last-quiz-card.component";
import {HomeButtonCardComponent} from "./home-button-card/home-button-card.component";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    HomeComponent,
    HomeButtonCardComponent,
    LastQuizCardComponent
  ],
  imports: [CommonModule, RouterModule]
})
export class HomeModule { }
