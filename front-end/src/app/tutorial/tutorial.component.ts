import { Component, OnInit } from '@angular/core';
import {Tutoriel} from "../../models/tutoriel.model";
import {Router} from "@angular/router";
import {QuizService} from "../../services/quiz.service";

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnInit {


  public tutoList: Tutoriel[] = [];

  constructor(private router: Router, public quizService: QuizService) {
  }

  ngOnInit(): void {
    this.createTutoriel();
  }

  createTutoriel(): void {
    this.tutoList[0]={
      question: "De quel couleur",
      reponse: "oui c'est comme ca"
    }
    console.log(this.tutoList)
  }
}
