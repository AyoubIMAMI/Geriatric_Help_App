import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {TutorialComponent} from "./tutorial.component";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  declarations: [
    TutorialComponent
  ],
  imports: [CommonModule, RouterModule,BrowserModule]
})
export class TutorialModule { }
