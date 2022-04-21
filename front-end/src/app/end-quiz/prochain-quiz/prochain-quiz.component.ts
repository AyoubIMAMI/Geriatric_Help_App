import { Component, OnInit } from '@angular/core';
import {Quiz} from "../../../models/quiz.model";
import {Router} from "@angular/router";
import {QuizService} from "../../../services/quiz.service";

@Component({
  selector: 'app-prochain-quiz',
  templateUrl: './prochain-quiz.component.html',
  styleUrls: ['./prochain-quiz.component.scss']
})
export class ProchainQuizComponent implements OnInit {

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
  defineSelectedQuiz(quiz: Quiz): void{
    this.quizService.setCurrentQuiz(quiz);
  }

}
