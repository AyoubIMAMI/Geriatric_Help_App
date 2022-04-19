import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {EndQuizComponent} from "./end-quiz.component";
import { ResultatsDisplayComponent } from './resultats-display/resultats-display.component';
import { ProchainQuizComponent } from './prochain-quiz/prochain-quiz.component';

@NgModule({
  declarations: [
    EndQuizComponent,
    ResultatsDisplayComponent,
    ProchainQuizComponent
  ],
  imports: [CommonModule, RouterModule]
})
export class EndQuizModule { }
