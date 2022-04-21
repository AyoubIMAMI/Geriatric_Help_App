import { Component, OnInit } from '@angular/core';
import {Stat} from "../../../models/stat.model";
import {StatService} from "../../../services/stat.service";
import {Resident} from "../../../models/resident.model";
import {Quiz} from "../../../models/quiz.model";
import {QuizService} from "../../../services/quiz.service";
import {ResidentService} from "../../../services/resident.service";

@Component({
  selector: 'app-last-quiz-card',
  templateUrl: './last-quiz-card.component.html',
  styleUrls: []
})
export class LastQuizCardComponent implements OnInit {
  public statList: Stat[] = [];
  public lastStat: Stat;
  public resident: Resident;
  public quiz: Quiz;

  constructor(public statService: StatService, public residentService: ResidentService, public quizService: QuizService) {
    this.statService.stats$.subscribe((stats: Stat[]) => {
      this.statList = stats;

      console.log("size", this.statList[0]);

      if(this.statList.length != 0) {

        this.lastStat = this.statList[this.statList.length - 1];

        this.residentService.residentSelected$.subscribe((resident) => this.resident = resident);
        this.residentService.setSelectedResident(this.lastStat.residentId);

        this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
        this.quizService.setSelectedQuiz(this.lastStat.quizzId);
      }
    });


  }

  ngOnInit(): void {

  }
}
