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
    this.createTutoriel();
  }

  ngOnInit(): void {
  }

  createTutoriel(): void {
    this.tutoList[0]=new class implements Tutoriel {
      question: "De quel couleur";
      reponse: "oui c'est comme ca";
    };
    console.log(this.tutoList)
  }

}
