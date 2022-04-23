import {element} from "protractor";
import {ActivatedRoute, Router} from "@angular/router";
import {QuizService} from "../../services/quiz.service";
import {ResidentService} from "../../services/resident.service";
import {Resident} from "../../models/resident.model";

export class HandicapMode {
  public loadingModeActivated: Boolean = false;
  public missClickModeActivated: Boolean = false;
  public mouseControlModeActivated = false;

  public listOfAllElementToNavigateIn:  Map<HTMLElement, Function>;
  public indexOfThehashMap: number = 0;



  public answerisCurrentlyLoading: Boolean = false;
  public mouseIn: Boolean = false;
  public mouseOut: Boolean = false;


  /*constructor(resident: Resident) {
    //this.defineModeByResident(resident);
  }

  defineModeByResident(resident: Resident, listOfAllElementToNavigateIn: Map<HTMLElement, Function>){
    let residentHandicap = resident.handicap;
    if(residentHandicap == "Tremblement essentiel") this.startLoadingMode()
    else if(residentHandicap == "Tremblement intentionnel")this.startMouseControlMode()
    else if(residentHandicap == "Tremblement attitude") this.startMissClick();
  }
*/
  //Loading Mode
  //----------------------------------------
  //startLoadingMode(listOfAllElementToNavigateIn: Map<HTMLElement, Function>){}

  addElementToLoadingMode(element: HTMLElement, callback: Function){}
    startLoadingMode(element: HTMLElement, callback: Function){
    this.loadingModeActivated = true;

    element.addEventListener("mouseenter", event => {
      console.log("mouseenter");
        if(!this.answerisCurrentlyLoading){
           this.load(element, callback);
        }

      });
    element.addEventListener("mouseleave", event => {
      console.log("mouseleave");
      if(this.answerisCurrentlyLoading) {
            this.unload(element);
        }
      });
    }

    setupToLoad(element: HTMLElement){
      let firstChild = element.firstChild as HTMLElement;
      if(!firstChild.classList.contains("loadAnswer")){
        var loadDiv = document.createElement("div");
        element.insertBefore(loadDiv, firstChild);
        loadDiv.classList.add("loadAnswer");
      }
    }

    unload(element: HTMLElement){
      this.setupToLoad(element);
      this.answerisCurrentlyLoading = false;
      const firstChild = element.firstChild as HTMLElement;
      firstChild.classList.remove("loadAnimation");
    }

    private load(element: HTMLElement, callback: Function){
      this.setupToLoad(element);
      this.answerisCurrentlyLoading = true;
      const firstChild = element.firstChild as HTMLElement;
      firstChild.classList.add("loadAnimation")
      firstChild.addEventListener("animationend", event => {
        firstChild.classList.remove("loadAnimation");
        callback(element);
      });
    }

  //Mouse control Mode
  //----------------------------------------
  startMouseControlMode(listOfAllElementToNavigateIn: Map<HTMLElement, Function>){
    this.mouseControlModeActivated = true;
    this.listOfAllElementToNavigateIn = listOfAllElementToNavigateIn;
    this.setupListenerLeftAndRightClick(Array.from(listOfAllElementToNavigateIn.keys()));

    if(document.getElementsByClassName("selected").length == 0){
      const firstElement: HTMLElement = Array.from(listOfAllElementToNavigateIn.keys())[0];
      firstElement.classList.add("selected");
    }
  }

  private setupListenerLeftAndRightClick(htmlElements: HTMLElement[]) {
    for(let i = 0 ; i < this.listOfAllElementToNavigateIn.size ;i++ ){
      const currenElement = htmlElements[i] as HTMLElement;
      currenElement.addEventListener("click", this.leftClick);
      currenElement.addEventListener("contextmenu", this.rightClick);
    }
  }

  leftClick(){
    if(this.mouseControlModeActivated){
      const element = Array.from(this.listOfAllElementToNavigateIn.keys())[this.indexOfThehashMap] as HTMLElement;
      const callback = this.listOfAllElementToNavigateIn.get(element);
      callback(element);
    }
  }
  rightClick(event: MouseEvent){
    const handicap = document.getElementById('mouseControl') as HTMLInputElement;
    if(handicap.checked || this.mouseControlModeActivated){
      event.preventDefault();
      this.incrementeCurrentElement()
      this.updateSelected();
    }
  }

  updateSelected(){
    const lastSelected = document.getElementsByClassName("selected")[0];
    lastSelected.classList.remove('selected');
    const answerSelected = Array.from(this.listOfAllElementToNavigateIn.keys())[this.indexOfThehashMap] as HTMLElement;
    answerSelected.classList.add('selected');
  }

  incrementeCurrentElement(){
    if(this.indexOfThehashMap >= this.listOfAllElementToNavigateIn.size-1) this.indexOfThehashMap = 0;
    else this.indexOfThehashMap+=1;
  }


  //Miss click Mode
  //----------------------------------------
  startMissClick(element: HTMLElement){
    this.missClickModeActivated = true;
    element.classList.add("missClickMode");
  }

  startMissClickVisible(element: HTMLElement){
    console.log("aaaaaaaaaaaaaa");
    this.startMissClick(element)
    element.classList.add("missClickModeVisible");
  }

  downMissClick(){
    this.missClickModeActivated = false;
    let allMissClickDiv = document.getElementsByClassName("missClickRange");
    for (let i = 0 ; i < allMissClickDiv.length ; i++) {
      const currentMissClickDiv = allMissClickDiv[i];
      currentMissClickDiv.classList.remove("missClickMode");
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
