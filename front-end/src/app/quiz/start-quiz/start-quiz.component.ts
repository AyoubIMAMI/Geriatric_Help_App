import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.scss']
})
export class StartQuizComponent implements OnInit {

  public responseIndex: number;
  constructor() {
    this.responseIndex = 0;
}

  ngOnInit(): void {}

  chooseAnswer(event: Event): void {
    const eventTarget: Element = event.target as Element;
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
    const handicap = document.getElementById('modeHandicape') as HTMLInputElement;
    if(handicap.checked){
      const answer = document.getElementsByClassName("answer")[this.responseIndex];
      this.revealAnswer(answer);
    }
  }
  rightClick(event: MouseEvent){
    const handicap = document.getElementById('modeHandicape') as HTMLInputElement;
    if(handicap.checked){
      event.preventDefault();
      this.incrementeResponseId()
      this.updateSelected();
    }
  }

  startHandicape(){
    if(document.getElementsByClassName("selected").length == 0){
      const firstAnswer = document.getElementsByClassName("answer")[0];
      firstAnswer.classList.add("selected");
    }
    else{
      let lastSelected = document.getElementsByClassName("selected")[0];
      lastSelected.classList.remove("selected");
    }
  }

}


