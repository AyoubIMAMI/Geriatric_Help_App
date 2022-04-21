import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/models/question.model';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import {ResidentService} from "../../services/resident.service";
import {Resident} from "../../models/resident.model";


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  /*public quiz: Quiz;
  public currentQuizIndex: number;
  public actualQuestion: Question;

  constructor(private route: ActivatedRoute, private quizService: QuizService) {
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
    this.currentQuizIndex=0;
    this.actualQuestion = this.quiz.questions[this.currentQuizIndex];
  }
  ngOnInit(): void {

  }

  previousQuiz(){
    if(this.currentQuizIndex>0)
      this.currentQuizIndex--;
  }

  nextQuiz(){
    this.currentQuizIndex++;
  }*/

  public quiz: Quiz;
  public currentQuestion: Question;
  public currentQuizIndex: number;
  public msg: number
  public resident: Resident;
  public questionList: Question[];


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

  ngOnInit(): void {
    const residentid = this.route.snapshot.paramMap.get('residentid');
    this.residentService.setSelectedResident(residentid);

    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
  }

  previousQuiz(){
    if(this.currentQuizIndex>0)
      this.currentQuizIndex--;
    this.currentQuestion = this.questionList[this.currentQuizIndex];
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
