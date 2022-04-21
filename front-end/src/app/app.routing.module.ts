import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizzesComponent } from './quizzes/quizzes.component';
import { QuizzesDisplayComponent } from './quizzes/quizzes-display//quizzes-display.component';
import { EditQuizComponent } from './quizzes/edit-quiz/edit-quiz.component';
import { UserListComponent } from './users/user-list/user-list.component';
import {HomeComponent} from "./home/home.component";
import {ResidentsComponent} from "./residents/residents.component";
import {ResidentComponent} from "./resident/resident.component";
import {QuizComponent} from "./quiz/quiz.component";
import {StartQuizComponent} from "./quiz/start-quiz/start-quiz.component";
import {EndQuizComponent} from "./end-quiz/end-quiz.component";
import {TutorialComponent} from "./tutorial/tutorial.component";
import {GestionQuizComponent} from "./gestion-quiz/gestion-quiz.component";
import {ResidentModificationComponent} from "./resident/resident-modification/resident-modification.component";
import {CreateQuizComponent} from "./create-quiz/create-quiz.component";
import {ResidentCreationComponent} from "./resident/resident-creation/resident-creation.component";


const routes: Routes = [
  {path: 'quiz/creation', component: CreateQuizComponent},
  {path: 'resident/creation', component: ResidentCreationComponent},
  {path: 'user-list', component: UserListComponent},
  {path: 'edit-quiz/:id', component: EditQuizComponent},
  {path: 'home', component: HomeComponent},
  {path: 'residents', component: ResidentsComponent},
  {path: 'resident/:id', component: ResidentComponent},
  {path: 'start-quiz', component: StartQuizComponent},
  {path: 'end-quiz/:residentid/:id', component: EndQuizComponent},
  {path: 'tutorial', component: TutorialComponent},
  {path: 'quiz', component: GestionQuizComponent},
  {path: 'quiz/:residentid/:id', component: QuizComponent},
  {path: 'quizzes/:residentid', component: QuizzesComponent},
  {path: 'quizzes-display', component: QuizzesDisplayComponent},

  {path: 'resident/:id/modification', component: ResidentModificationComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
