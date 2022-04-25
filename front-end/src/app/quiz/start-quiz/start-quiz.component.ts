import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  Input,
  AfterContentInit,
  AfterViewInit,
  AfterViewChecked,
  ViewEncapsulation
} from '@angular/core';
import { Question } from 'src/models/question.model';
import {Resident} from "../../../models/resident.model";
import { HandicapMode } from "../handicapMode";
import {Quiz} from "../../../models/quiz.model";
import {Router} from "@angular/router";


@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StartQuizComponent implements OnInit, AfterViewInit {

  @Input() indexOfQuestion: number;
  @Input() currentQuestion: Question;
  @Input() currentResident: Resident;
  @Input() nextQuestionFunction: Function;

  @Input() quiz: Quiz;
  public currentQuestionIndex: number;



  public handicapMode: HandicapMode;
  public responseIndex: number;
  public label: string;
  public mouseControlModeActivated: Boolean;
  public missClickModeActivated: Boolean;
  public loadingModeActivated: Boolean;
  public animationAsBeenInterupt: Boolean;
  public answerisCurrentlyLoading: Boolean;
  public mouseIn: Boolean;
  public mouseOut: Boolean;



  constructor(public router : Router) {
    this.responseIndex = 0;
    this.mouseControlModeActivated = false;
    this.missClickModeActivated = false;
    this.loadingModeActivated = false;
    this.animationAsBeenInterupt = false;
    this.answerisCurrentlyLoading = false;
    this.mouseIn = false;
    this.mouseOut = false;
    this.currentQuestionIndex = this.indexOfQuestion;
  }

  ngOnInit() {

  }
  ngOnChanges(): void{
    if(this.indexOfQuestion != this.responseIndex) this.hideAnswer();
  }

  ngAfterViewInit(): void{
    //this.defineModeByResident(this.currentResident);
    this.handicapMode = new HandicapMode(this.currentResident, this.getMapAnswersrevealAnswer())
  }
  nextQuiz(){
    if(this.indexOfQuestion >= this.quiz.questions.length-1)
      this.router.navigate(['./end-quiz/'+this.currentResident.id+'/'+this.quiz.id]);
    else{
      this.indexOfQuestion++;
      this.currentQuestion = this.quiz.questions[this.indexOfQuestion];
    }
  }

  private getMapAnswersrevealAnswer() {
    let allAnswer = document.getElementsByClassName("answer");
    let map = new Map();
    let nextQuestionElement = document.getElementById("nextQuestion") as HTMLElement;
    map.set(nextQuestionElement, this.nextQuestionFunction);
    for(let i = 0 ; i < allAnswer.length ; i++ ){
      map.set(allAnswer[i], this.revealAnswer);
    }
    return map;
  }


  chooseAnswer(event: Event): void {
    const eventTarget: Element = event.target as Element;
    if(eventTarget.classList.contains("missClickRange"))
      this.revealAnswer(eventTarget.firstChild);
    else
      this.revealAnswer(eventTarget);
  }

  revealAnswer(answer){
    const isAnswer: boolean = answer.classList.contains("true");
    const resultAnswer: Element = document.getElementById("resultAnswer");
    //this.showAnswer();
    const answerList = document.getElementsByClassName("answer");
    for(let i = 0 ; i < answerList.length ; i++){
      answerList[i].classList.remove("hide");
    }
    if(isAnswer)
      resultAnswer.innerHTML = "Félicitation! Tu as trouvé la bonne réponse !";
    else
      resultAnswer.innerHTML = "Dommage! Ce n'étais pas la bonne réponse ! "
  }

  showAnswer(){
    const answerList = document.getElementsByClassName("answer");
    for(let i = 0 ; i < answerList.length ; i++){
      answerList[i].classList.remove("hide");
    }
  }

  hideAnswer(){
    const answerList = document.getElementsByClassName("answer");
    const resultAnswer: Element = document.getElementById("resultAnswer");
    resultAnswer.innerHTML = "";
    for(let i = 0 ; i < answerList.length ; i++){
      answerList[i].classList.add("hide");
    }
  }


}

