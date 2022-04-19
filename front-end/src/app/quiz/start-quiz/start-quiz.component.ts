import { Component, ViewChild, ElementRef, OnInit, Input } from '@angular/core';
import { Question } from 'src/models/question.model';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.scss']
})
export class StartQuizComponent implements OnInit {

  @Input() test: string;
  @Input() currentQuestion: Question;


  public responseIndex: number;
  public label: String;

  constructor() {
    this.responseIndex = 0;
  }

  ngOnInit() {
      console.log('This if the value for user-id: ' + this.test);
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
    this.showAnswer()
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

  incrementeResponseId(){
    if(this.responseIndex >= 3) this.responseIndex = 0;
    else this.responseIndex+=1;
  }

  updateSelected(){
    const lastSelected = document.getElementsByClassName("selected")[0];
    lastSelected.classList.remove('selected');
    const answerSelected = document.getElementsByClassName("answer")[this.responseIndex];
    answerSelected.classList.add('selected');
  }

  leftClick(){
    const handicap = document.getElementById('mouseControl') as HTMLInputElement;
    if(handicap.checked){
      const answer = document.getElementsByClassName("answer")[this.responseIndex];
      this.revealAnswer(answer);
    }
  }
  rightClick(event: MouseEvent){
    const handicap = document.getElementById('mouseControl') as HTMLInputElement;
    if(handicap.checked){
      event.preventDefault();
      this.incrementeResponseId()
      this.updateSelected();
    }
  }

  clearModes() {
      this.downMouseControlMode();
      this.downMissClick();
      this.downMissClickVisible();
  }

  updateMode(){
    let currentMode = "none";
    let radioButtons = document.querySelectorAll('input[name="mode"]');
    this.clearModes();

    for (let i = 0 ; i < radioButtons.length ; i++) {
      let currentButton = radioButtons[i] as HTMLInputElement;
      if (currentButton.checked) {
        currentMode = currentButton.value;
        break;
      }
    }
    if(currentMode == "mouseControle")this.startMouseControlMode();
    else if(currentMode == "missClick")this.startMissClick();
    else if(currentMode == "missClickVisible")this.startMissClickVisible();

  }
  

  startMouseControlMode(){
    if(document.getElementsByClassName("selected").length == 0){
      const firstAnswer = document.getElementsByClassName("answer")[0];
      firstAnswer.classList.add("selected");
    }
  }

  downMouseControlMode(){
    if(document.getElementsByClassName("selected").length > 0){
      const firstAnswer = document.getElementsByClassName("answer")[0];
      firstAnswer.classList.remove("selected");
    }
  }

  startMissClick(){
    let allMissClickDiv = document.getElementsByClassName("missClickRange");
    for (let i = 0 ; i < allMissClickDiv.length ; i++) {
      const currentMissClickDiv = allMissClickDiv[i];
      currentMissClickDiv.classList.add("missClickMode");
    }
  }

  downMissClick(){
    let allMissClickDiv = document.getElementsByClassName("missClickRange");
    for (let i = 0 ; i < allMissClickDiv.length ; i++) {
      const currentMissClickDiv = allMissClickDiv[i];
      currentMissClickDiv.classList.remove("missClickMode");
    }
  }

  startMissClickVisible(){
    this.startMissClick()
    let allMissClickDiv = document.getElementsByClassName("missClickRange");
    for (let i = 0 ; i < allMissClickDiv.length ; i++) {
      const currentMissClickDiv = allMissClickDiv[i];
      currentMissClickDiv.classList.add("missClickModeVisible");
    }
  }

  downMissClickVisible(){
    this.downMissClick()
    let allMissClickDiv = document.getElementsByClassName("missClickRange");
    for (let i = 0 ; i < allMissClickDiv.length ; i++) {
      const currentMissClickDiv = allMissClickDiv[i];
      currentMissClickDiv.classList.remove("missClickModeVisible");
    }
  }

}


