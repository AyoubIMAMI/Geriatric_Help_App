import { Component, OnInit } from '@angular/core';
import {Quiz} from "../../../models/quiz.model";
import {ActivatedRoute} from "@angular/router";
import {QuizService} from "../../../services/quiz.service";
import {Resident} from "../../../models/resident.model";
import {ResidentService} from "../../../services/resident.service";

@Component({
  selector: 'app-resultats-display',
  templateUrl: './resultats-display.component.html',
  styleUrls: ['./resultats-display.component.scss']
})
export class ResultatsDisplayComponent implements OnInit {

  public quiz: Quiz;
  public resident: Resident;

  constructor(private route: ActivatedRoute, private quizService: QuizService, private  residentService: ResidentService) {
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
    this.residentService.residentSelected$.subscribe( (resident) => this.resident = resident);
  }
  ngOnInit(): void {
    const idQuiz = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(idQuiz);

    const idResident = this.route.snapshot.paramMap.get('residentid');
    this.residentService.setSelectedResident(idResident);
  }

}
