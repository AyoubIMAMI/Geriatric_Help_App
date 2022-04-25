import { Component, OnInit } from '@angular/core';
import {Quiz} from "../../../models/quiz.model";
import {Router} from "@angular/router";
import {QuizService} from "../../../services/quiz.service";

@Component({
  selector: 'app-tutoriel-display',
  templateUrl: './tutoriel-display.component.html',
  styleUrls: ['./tutoriel-display.component.scss']
})
export class TutorielDisplayComponent implements OnInit {

  public tutolist: Quiz[] = [];

  constructor(private router: Router, public quizService: QuizService) {
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.tutolist = quizzes;
    });
  }

  ngOnInit(): void {
  }

  quizSelected(selected: boolean): void {
    console.log('event received from child:', selected);
  }

}
