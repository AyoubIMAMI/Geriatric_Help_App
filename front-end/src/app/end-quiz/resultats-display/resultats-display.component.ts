import { Component, OnInit } from '@angular/core';
import {Quiz} from "../../../models/quiz.model";
import {ActivatedRoute} from "@angular/router";
import {QuizService} from "../../../services/quiz.service";

@Component({
  selector: 'app-resultats-display',
  templateUrl: './resultats-display.component.html',
  styleUrls: ['./resultats-display.component.scss']
})
export class ResultatsDisplayComponent implements OnInit {

  public quiz: Quiz = null;

  constructor(private route: ActivatedRoute, private quizService: QuizService) {
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
  }

}
