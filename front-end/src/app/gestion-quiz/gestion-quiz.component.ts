import { Component, OnInit } from '@angular/core';
import {Tutoriel} from "../../models/tutoriel.model";
import {Router} from "@angular/router";
import {QuizService} from "../../services/quiz.service";

@Component({
  selector: 'app-gestion-quiz',
  templateUrl: './gestion-quiz.component.html',
  styleUrls: ['./gestion-quiz.component.scss']
})
export class GestionQuizComponent implements OnInit {


  public tutoList: Tutoriel[] = [];

  constructor(private router: Router, public quizService: QuizService) {
  }

  ngOnInit(): void {
  }
}
