import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Quiz} from "../../../models/quiz.model";
import {ActivatedRoute, Router} from "@angular/router";
import {QuizService} from "../../../services/quiz.service";
import {Resident} from "../../../models/resident.model";
import {HandicapMode} from "../../quiz/handicapMode";

@Component({
  selector: 'app-prochain-quiz',
  templateUrl: './prochain-quiz.component.html',
  styleUrls: ['./prochain-quiz.component.scss']
})
export class ProchainQuizComponent implements OnInit,AfterViewInit {

  public quizList: Quiz[] = [];
  public quiz:Quiz;
  public residentid:string;
  public listOfAllElementToNavigateIn:  Map<HTMLElement, Function>;
  public indexOfThehashMap: number = 0;
  public handicapMode: HandicapMode;
  @Input() currentResident: Resident;


  constructor(private route: ActivatedRoute,private router: Router, public quizService: QuizService) {
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
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
  }

  ngAfterViewInit(): void{
    this.listOfAllElementToNavigateIn = this.getMapAnswersrevealAnswer();
    this.handicapMode = new HandicapMode(this.currentResident, this.getMapAnswersrevealAnswer())
  }

  quizSelected(selected: boolean): void {
    console.log('event received from child:', selected);
  }
  defineSelectedQuiz(quiz: Quiz): void{
    this.quizService.setCurrentQuiz(quiz);
  }

  private getMapAnswersrevealAnswer() {
    let allAnswer = document.getElementsByClassName("answer");
    let map = new Map();
    let nextQuestionElement = document.getElementById("nextQuestion") as HTMLElement;
    map.set(nextQuestionElement, ()=> this.nextQuiz());
    for(let i = 0 ; i < allAnswer.length ; i++ ){
      map.set(allAnswer[i], ()=> this.revealAnswer(allAnswer[i]));
    }
    return map;
  }

}
