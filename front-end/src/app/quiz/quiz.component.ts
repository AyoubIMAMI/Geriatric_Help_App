import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  public quiz: Quiz;
  public currentQuizIndex: number;
  public label: String;

  constructor(private route: ActivatedRoute, private quizService: QuizService) {
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
    this.currentQuizIndex=0;
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
    this.label= this.quiz.questions[0].label;
  }

  previousQuiz(){
    if(this.currentQuizIndex>0)
      this.currentQuizIndex--;
  }

  nextQuiz(){
    this.currentQuizIndex++;
  }
}
