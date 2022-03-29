import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { EditQuizComponent } from './quizzes/edit-quiz/edit-quiz.component';
import { UserListComponent } from './users/user-list/user-list.component';
import {HomeComponent} from "./home/home.component";
import {ResidentsComponent} from "./residents/residents.component";
import {ResidentComponent} from "./resident/resident.component";
import {StartQuizComponent} from "./start-quiz/start-quiz.component";
import {LancementQuizComponent} from "./lancement-quiz/lancement-quiz.component";

const routes: Routes = [
  {path: 'user-list', component: UserListComponent},
  {path: 'quiz-list', component: QuizListComponent},
  {path: 'edit-quiz/:id', component: EditQuizComponent},
  {path: 'home', component: HomeComponent},
  {path: 'residents', component: ResidentsComponent},
  {path: 'resident/:id', component: ResidentComponent},
  {path: 'start-quiz', component: StartQuizComponent},
  {path: 'lancement-quiz', component: LancementQuizComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
