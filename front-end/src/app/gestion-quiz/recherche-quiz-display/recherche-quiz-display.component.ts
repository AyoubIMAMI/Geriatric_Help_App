import { Component, OnInit } from '@angular/core';
import {Quiz} from "../../../models/quiz.model";
import {Router} from "@angular/router";
import {QuizService} from "../../../services/quiz.service";
@Component({
  selector: 'app-recherche-quiz-display',
  templateUrl: './recherche-quiz-display.component.html',
  styleUrls: ['./recherche-quiz-display.component.scss']
})

export class RechercheQuizDisplayComponent implements OnInit {

  public quizList: Quiz[] = [];

  constructor(private router: Router, public quizService: QuizService) {
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
    });
  }

  ngOnInit(): void {
  }

  quizSelected(selected: boolean): void {
    console.log('event received from child:', selected);
  }

}
