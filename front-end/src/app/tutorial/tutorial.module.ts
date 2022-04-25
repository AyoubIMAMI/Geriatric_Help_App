import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {TutorialComponent} from "./tutorial.component";
import { TutorielDisplayComponent } from './tutoriel-display/tutoriel-display.component';

@NgModule({
  declarations: [
    TutorialComponent,
    TutorielDisplayComponent
  ],
  imports: [CommonModule, RouterModule]
})
export class QuizzesModule { }
