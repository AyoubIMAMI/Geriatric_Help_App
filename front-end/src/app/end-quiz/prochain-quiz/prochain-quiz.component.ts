import { Component, OnInit } from '@angular/core';
import {Quiz} from "../../../models/quiz.model";
import {ActivatedRoute, Router} from "@angular/router";
import {QuizService} from "../../../services/quiz.service";
import {ResidentService} from "../../../services/resident.service";
import {Resident} from "../../../models/resident.model";

@Component({
  selector: 'app-prochain-quiz',
  templateUrl: './prochain-quiz.component.html',
  styleUrls: ['./prochain-quiz.component.scss']
})
export class ProchainQuizComponent implements OnInit {

  public quizList: Quiz[] = [];
  public quiz:Quiz;
  public residentid:string;
  public resident:Resident;


  constructor(private residentService: ResidentService,private route: ActivatedRoute,private router: Router, public quizService: QuizService) {
    this.residentService.residentSelected$.subscribe((resident) =>
    {this.resident = resident
    console.log(this.resident)});
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
      for (let i = this.quizList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.quizList[i], this.quizList[j]] = [this.quizList[j], this.quizList[i]];
      }
    });
  }

  ngOnInit(): void {

    this.residentid = this.route.snapshot.paramMap.get('residentid');
    this.residentService.setSelectedResident(this.residentid);
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
  }

  quizSelected(selected: boolean): void {
    console.log('event received from child:', selected);
  }
  defineSelectedQuiz(quiz: Quiz): void{
    this.quizService.setCurrentQuiz(quiz);
  }

}
