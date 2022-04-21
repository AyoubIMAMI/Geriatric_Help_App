import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/models/question.model';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';


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



  constructor(private quizService: QuizService,   public router : Router) {
    this.quiz = this.quizService.getCurrentQuiz();
    this.currentQuestion = this.quiz.questions[0];
    this.currentQuizIndex=0;
  }
  ngOnInit(): void {
    
  }
  previousQuiz(){
    if(this.currentQuizIndex>0)
      this.currentQuizIndex--;
    this.currentQuestion = this.quiz.questions[this.currentQuizIndex];
  }

  nextQuiz(){
    if(this.currentQuizIndex >= this.quiz.questions.length-1)
      this.router.navigate(['./end-quiz']);
    else{
      this.currentQuizIndex++;
      this.currentQuestion = this.quiz.questions[this.currentQuizIndex];
    }
    console.log("currenIndex="+this.currentQuizIndex+" and maxIndex="+this.quiz.questions.length);
  }
  
}
