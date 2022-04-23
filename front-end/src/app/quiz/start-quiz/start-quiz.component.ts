import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  Input,
  AfterContentInit,
  AfterViewInit,
  AfterViewChecked
} from '@angular/core';
import { Question } from 'src/models/question.model';
import {Resident} from "../../../models/resident.model";

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.scss']
})
export class StartQuizComponent implements OnInit, AfterViewChecked {

  @Input() indexOfQuestion: string;
  @Input() currentQuestion: Question;
  @Input() currentResident: Resident;


  public responseIndex: number;
  public label: string;
  public mouseControlModeActivated: Boolean;
  public missClickModeActivated: Boolean;
  public loadingModeActivated: Boolean;
  public animationAsBeenInterupt: Boolean;
  public answerisCurrentlyLoading: Boolean;
  public mouseIn: Boolean;
  public mouseOut: Boolean;







  constructor() {
    this.responseIndex = 0;
    this.mouseControlModeActivated = false;
    this.missClickModeActivated = false;
    this.loadingModeActivated = false;
    this.animationAsBeenInterupt = false;
    this.answerisCurrentlyLoading = false;
    this.mouseIn = false;
    this.mouseOut = false;


    //this.fixFontSize();
  }

  ngOnInit() {
      console.log('This if the value for user-id: ' + this.indexOfQuestion);
  }
  ngOnChanges(): void{
    if(+this.indexOfQuestion != this.responseIndex) this.hideAnswer();
  }

  ngAfterViewChecked(): void{
    this.defineModeByResident(this.currentResident);
    let answer = document.getElementsByClassName("answer")[0];
    /*answer.addEventListener("mouseover", event => {
      console.log("Mouse in");
    });

    answer.addEventListener("mouseout", event => {
      console.log("Mouse out");
    });*/
  }

  defineModeByResident(resident: Resident){
    let residentHandicap = resident.handicap;
    if(residentHandicap == "Tremblement essentiel") this.startLoadingMode()
    else if(residentHandicap == "Tremblement intentionnel")this.startMouseControlMode()
    else if(residentHandicap == "Tremblement attitude") this.startMissClick();
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

  hideAnswer(){
    const answerList = document.getElementsByClassName("answer");
    const resultAnswer: Element = document.getElementById("resultAnswer");
    resultAnswer.innerHTML = "";
    for(let i = 0 ; i < answerList.length ; i++){
      answerList[i].classList.add("hide");
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
    if(handicap.checked || this.mouseControlModeActivated){
      const answer = document.getElementsByClassName("answer")[this.responseIndex];
      this.revealAnswer(answer);
    }
  }
  rightClick(event: MouseEvent){
    const handicap = document.getElementById('mouseControl') as HTMLInputElement;
    if(handicap.checked || this.mouseControlModeActivated){
      event.preventDefault();
      this.incrementeResponseId()
      this.updateSelected();
    }
  }

  clearModes() {
      this.downMouseControlMode();
      this.downMissClick();
      this.downMissClickVisible();
      this.downLoadingMod();
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
    else if(currentMode == "loadingMode")this.startLoadingMode();
  }

  startLoadingMode(){
      this.loadingModeActivated = true;
      let allAnswerContainers = document.getElementsByClassName('answerContainer');

      for (let i = 0 ; i < allAnswerContainers.length ; i++) {
          let answerContainer = allAnswerContainers[i] as HTMLElement;
        answerContainer.addEventListener("mouseenter", event => {
          if(!this.answerisCurrentlyLoading && !this.mouseIn){
            console.log("mouseenter, answerisCurrentlyLoading:"+ this.answerisCurrentlyLoading+" mouseIn:"+this.mouseIn+" mouseOut:"+this.mouseOut);
            if(this.answerisCurrentlyLoading != this.mouseIn)   console.log("--------answerisCurrentlyLoading != mouseIn--------")
            if(this.mouseOut == this.mouseIn)   console.log("--------mouseOut == mouseIn--------")

            this.answerisCurrentlyLoading = true;
            this.mouseIn=true;
            this.mouseOut = false;
            const questionLoaded: Boolean = this.loadQuestion(answerContainer);
          }

        });
        answerContainer.addEventListener("mouseleave", event => {
          if(this.answerisCurrentlyLoading && !this.mouseOut) {
            console.log("mouseleave, answerisCurrentlyLoading:"+ this.answerisCurrentlyLoading+" mouseIn:"+this.mouseIn+" mouseOut:"+this.mouseOut);
            this.answerisCurrentlyLoading = false;
            this.mouseOut = true;
            this.mouseIn = false;

            this.animationAsBeenInterupt = true;
            const answerButton = answerContainer.firstChild as HTMLElement;
            //answerButton.classList.add("endLoadAnimation");
            answerButton.classList.remove("loadAnimation");
          }
        });
      }
      let nextQuestion = document.getElementById("");
  }

  /*loadMouseInEvent(answerContainer: HTMLElement, ev: Event){
    console.log("Mouse in");
    const questionLoaded: Boolean = this.loadQuestion(this as HTMLElement);
    if(questionLoaded)this.revealAnswer(this);
  }
  loadMouseOutEvent(answerContainer: HTMLElement) { console.log("Mouse out");
    this.animationAsBeenInterupt = true;
    const answerButton = answerContainer.firstChild as HTMLElement;
    //answerButton.classList.add("endLoadAnimation");
    answerButton.classList.remove("loadAnimation");

  }*/

    downLoadingMod(){
      //myDIV.removeEventListener("mousemove", myFunction);
    this.loadingModeActivated = false;
    let allAnswerContainers = document.getElementsByClassName('answerContainer');

    for (let i = 0 ; i < allAnswerContainers.length ; i++) {
      let answerContainer = allAnswerContainers[i] as HTMLElement;
      answerContainer.removeEventListener("mousemove", event => {
        console.log("Mouse in");
        const questionLoaded: Boolean = this.loadQuestion(answerContainer);
        if(questionLoaded)this.revealAnswer(answerContainer);
      });
      answerContainer.removeEventListener("mouseout", event => {
        console.log("Mouse out");
        this.animationAsBeenInterupt = true;
        const answerButton = answerContainer.firstChild as HTMLElement;
        //answerButton.classList.add("endLoadAnimation");
        answerButton.classList.remove("loadAnimation");
      });
    }

  }

    loadQuestion(answerContainer: HTMLElement): Boolean{
        //Je lance l'animation
        //A la fin si l'animation a été cancel alors return false
        //sinon return true
      let transitionEvent = whichTransitionEvent();
      const answerButton = answerContainer.firstChild as HTMLElement;
      let actionIsEnded: Boolean =  false;
      answerButton.classList.add("loadAnimation")
      answerButton.addEventListener("animationend", event => {
        this.revealAnswer(answerContainer);
      });
      return true;
    }


  startMouseControlMode(){
    this.mouseControlModeActivated = true;
    if(document.getElementsByClassName("selected").length == 0){
      const firstAnswer = document.getElementsByClassName("answer")[0];
      firstAnswer.classList.add("selected");
    }
  }

  downMouseControlMode(){
    this.mouseControlModeActivated = false;
    if(document.getElementsByClassName("selected").length > 0){
      const firstAnswer = document.getElementsByClassName("answer")[0];
      firstAnswer.classList.remove("selected");
    }
  }

  startMissClick(){
    this.missClickModeActivated = true;
    let allMissClickDiv = document.getElementsByClassName("missClickRange");
    for (let i = 0 ; i < allMissClickDiv.length ; i++) {
      const currentMissClickDiv = allMissClickDiv[i];
      currentMissClickDiv.classList.add("missClickMode");
    }
  }

  downMissClick(){
    this.missClickModeActivated = false;
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

  /*
  fixFontSize() {
    let listAnswer = document.getElementsByClassName("answer");
    for(let i = 0; i < 4; i++) {
      let currentAnswer = listAnswer[i] as HTMLElement;
      if(currentAnswer.innerText.length > 50) {

      }
    }
  }*/

}
function whichTransitionEvent(){
  var t,
    el = document.createElement("fakeelement");

  var transitions = {
    "transition"      : "transitionend",
    "OTransition"     : "oTransitionEnd",
    "MozTransition"   : "transitionend",
    "WebkitTransition": "webkitTransitionEnd"
  }

  for (t in transitions){
    if (el.style[t] !== undefined){
      return transitions[t];
    }
  }
}

