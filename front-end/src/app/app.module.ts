import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { QuizComponent } from './quizzes/quiz/quiz.component';
import { HeaderComponent } from './header/header.component';
import { QuizFormComponent } from './quizzes/quiz-form/quiz-form.component';
import { EditQuizComponent } from './quizzes/edit-quiz/edit-quiz.component';
import { AppRoutingModule } from './app.routing.module';
import { QuestionListComponent } from './questions/question-list/question-list.component';
import { QuestionFormComponent } from './questions/question-form/question-form.component';
import { QuestionComponent } from './questions/question/question.component';
import { UserComponent } from './users/user/user.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { HomeModule } from "./home/home.module";
import {ResidentsModule} from "./residents/residents.module";
import {QuizzesModule} from "./quizzes/quizzes.module";
import {ResidentModule} from "./resident/resident.module";
import {QuizModule} from "./quiz/quiz.module";
import {ResidentModificationModule} from "./resident/resident-modification/resident-modification.module";
import {GestionQuizModule} from "./gestion-quiz/gestion-quiz.module";
import {CreateQuizModule} from "./create-quiz/create-quiz.module";
import {ResidentCreationModule} from "./resident/resident-creation/resident-creation.module";

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    HeaderComponent,
    QuizFormComponent,
    EditQuizComponent,
    QuestionListComponent,
    QuestionFormComponent,
    QuestionComponent,
    UserComponent,
    UserFormComponent,
    UserListComponent,
  ],
  imports: [
    ResidentsModule,
    QuizzesModule,
    ResidentModule,
    QuizModule,
    HomeModule,
    ResidentModificationModule,
    ResidentCreationModule,
    GestionQuizModule,
    CreateQuizModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
