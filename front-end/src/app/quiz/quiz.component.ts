import {AfterViewChecked, Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/models/question.model';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import {ResidentService} from "../../services/resident.service";
import {Resident} from "../../models/resident.model";
//import { HandicapMode } from "../handicapMode";


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit, AfterViewChecked {

  public quiz: Quiz;
  public currentQuestion: Question;
  public currentQuizIndex: number;
  public resident: Resident;
  public questionList: Question[];
 // public handicapMode = new HandicapMode();


  constructor(private route:ActivatedRoute,private quizService: QuizService,private residentService: ResidentService,   public router : Router) {
    this.residentService.residentSelected$.subscribe((resident) => this.resident = resident);
    this.quizService.quizSelected$.subscribe((quiz) => {
      this.quiz = quiz;
      this.questionList=quiz.questions;
      this.currentQuestion=this.questionList[0];
      console.log(this.quiz.name);
    });

    this.currentQuizIndex=0;
  }

  ngAfterViewChecked(): void {
        const nextQuestion = document.getElementById("nextQuestion");
    }

  ngOnInit(): void {
    const residentid = this.route.snapshot.paramMap.get('residentid');
    this.residentService.setSelectedResident(residentid);

    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
  }

  nextQuiz(){
    if(this.currentQuizIndex >= this.questionList.length-1)
      this.router.navigate(['./end-quiz/'+this.resident.id+'/'+this.quiz.id]);
    else{
      this.currentQuizIndex++;
      this.currentQuestion = this.questionList[this.currentQuizIndex];
    }
    console.log("currenIndex="+this.currentQuizIndex+" and maxIndex="+this.questionList.length);
  }
  getCurrentQuestion(){

    return this.questionList[this.currentQuizIndex];
  }



}
