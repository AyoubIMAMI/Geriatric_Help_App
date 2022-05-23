import { Resident } from 'src/models/resident.model';
import {Injectable} from "@angular/core";
import {StatsHandicapService} from "./statsHandicap.service";
import {ClickData} from "../models/clickData.model";
import {httpOptionsBase, serverUrl} from "../configs/server.config";
import {Quiz} from "../models/quiz.model";
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";
import {StatsResident} from "../models/statsResident.model";

@Injectable({
  providedIn: 'root'
})
export class HandicapService {
  public loadingModeActivated: Boolean = false;
  public missClickModeActivated: Boolean = false;
  public mouseControlModeActivated: Boolean = false;
  public answerisCurrentlyLoading: Boolean = false;
  public residentId: string;
  public $arrayClick: Subject<StatsResident[]> = new Subject();

  public listOfAllElementToNavigateIn:  Map<HTMLElement, Function>;
  public indexOfThehashMap: number = 0;

  public nbclick: number = 0;
  public nbpages: number = 0;
  public nbGoodResponses: number = 0;
  public nbBadResonses: number = 0;

  private clickNumberUrl = serverUrl + '/clickNumber';

  private httpOptions = httpOptionsBase;


  statsHandicapService : StatsHandicapService;

  constructor(private http: HttpClient) {}

  initHandicap(resident: Resident, listOfAllElementToNavigateIn: Map<HTMLElement, Function>, statsHandicapService : StatsHandicapService) {
    this.listOfAllElementToNavigateIn = listOfAllElementToNavigateIn;
    this.residentId = resident.id
    this.defineModeByResident(resident);
    this.getCursorPosition(this.residentId);
    this.statsHandicapService = statsHandicapService;
  }

  defineModeByResident(resident: Resident){
    let residentHandicap = resident.handicap;
    if(residentHandicap == "Tremblement essentiel") this.startLoadingMode()
    else if(residentHandicap == "Tremblement intentionnel")this.startMouseControlMode()
    else if(residentHandicap == "Tremblement d'attitude") this.startMissClick();
  }

  removeAllEventListener(){
    //Loading Mode
    for(let i = 0 ; i < this.listOfAllElementToNavigateIn.size; i++){
      const element: HTMLElement = Array.from(this.listOfAllElementToNavigateIn.keys())[i];
      let callBack = this.listOfAllElementToNavigateIn.get(element);
      this.removeElementToLoadingMode(element, callBack)
    }
    //mouseControl
    this.removeListener();

    //missClick
    this.removeListenerToCountClick();
  }

  sendNbClickForCurrentQuestion(){
    let date: Date = new Date();
    const jsonToPut:JSON = <JSON><unknown>{
      "residentId": this.residentId,
      "numberOfClicks": this.nbclick,
      "numberOfPages": this.nbpages,
      "numberOfGoodResponses": this.nbGoodResponses,
      "numberOfBadResponses": this.nbBadResonses,
    }
    const clickurl=this.clickNumberUrl+"/"+this.residentId+"/"+date.getFullYear()+"/"+date.getMonth()+"/"+date.getDate()
    this.http.put<Quiz>(clickurl, jsonToPut, this.httpOptions).subscribe();
    this.nbclick = 0;
  }


  getClickStatsForResident(theResidentId: string, dateA: Date, dateB: Date){
    console.log("dateA = "+dateA);
    console.log("dateB = "+dateB);

    const clickurl=this.clickNumberUrl+"/"+theResidentId+"/"+dateA.getFullYear()+"/"+dateA.getMonth()+"/"+dateA.getDate()+"/"+dateB.getFullYear()+"/"+dateB.getMonth()+"/"+dateB.getDay()
    console.log("clickurl = "+clickurl);


    this.http.get<StatsResident[]>(clickurl).subscribe(
      (tabData)=>{
        this.$arrayClick.next(tabData);
        console.log("end get, tabData = "+tabData);
      }
  );
  }

  //Loading Mode
  //----------------------------------------
  startLoadingMode(){
    for(let i = 0 ; i < this.listOfAllElementToNavigateIn.size; i++){
      const element: HTMLElement = Array.from(this.listOfAllElementToNavigateIn.keys())[i];
      let callBack = this.listOfAllElementToNavigateIn.get(element);
      this.addElementToLoadingMode(element, callBack)
    }
  }

  addElementToLoadingMode(element: HTMLElement, callback: Function){
    this.loadingModeActivated = true;

    element.addEventListener("mouseenter", event => {
      this.nbclick++;
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

  removeElementToLoadingMode(element: HTMLElement, callback: Function){
    this.loadingModeActivated = true;

    element.removeEventListener("mouseenter", event => {
      this.nbclick++;
      console.log("mouseenter");
      if(!this.answerisCurrentlyLoading){
        this.load(element, callback);
      }

    });
    element.removeEventListener("mouseleave", event => {
      console.log("mouseleave");
      if(this.answerisCurrentlyLoading) {
        this.unload(element);
      }
    });
  }

    setupToLoad(element: HTMLElement){
      let firstChild = element.firstChild as HTMLElement;
      if(!firstChild.classList.contains("loadAnswer")){
        //firstChild.style.zIndex="1";
        var loadDiv = document.createElement("div");
        element.insertBefore(loadDiv, firstChild);
        loadDiv.classList.add("loadAnswer");
        //let parentHeight: number = +element.offsetHeight;
        //loadDiv.style.height = element.offsetHeight.toString()+"px";
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


  startMouseControlMode(){
    this.mouseControlModeActivated = true;
    this.setupListenerLeftAndRightClick(Array.from(this.listOfAllElementToNavigateIn.keys()));

    if(document.getElementsByClassName("selected").length == 0){
      const firstElement: HTMLElement = Array.from(this.listOfAllElementToNavigateIn.keys())[0];
      firstElement.classList.add("selected");
    }
  }

  private removeListener(){
    document.body.removeEventListener("keydown", e => {
      let handicapePage = document.getElementsByClassName("handicapePage").length;
      if(handicapePage>=1){
        this.nbclick++;
        this.clickWithkeyBoard()
      }
    });
    document.body.removeEventListener("click", e => {
      let handicapePage = document.getElementsByClassName("handicapePage").length;
      if(handicapePage>=1)
        this.moveInPageWithMouse(e)
    });
    document.body.removeEventListener("contextmenu", e => {
      let handicapePage = document.getElementsByClassName("handicapePage").length;
      if(handicapePage>=1)
        this.moveInPageWithMouse(e)
    });
  }

  private setupListenerLeftAndRightClick(htmlElements: HTMLElement[]) {
    document.body.addEventListener("keydown", e => {
      let handicapePage = document.getElementsByClassName("handicapePage").length;
      if(handicapePage>=1){
        this.nbclick++;
        this.clickWithkeyBoard()
      }
    });
    document.body.addEventListener("click", e => {
      let handicapePage = document.getElementsByClassName("handicapePage").length;
      if(handicapePage>=1)
        this.moveInPageWithMouse(e)
    });
      document.body.addEventListener("contextmenu", e => {
        let handicapePage = document.getElementsByClassName("handicapePage").length;
        if(handicapePage>=1)
          this.moveInPageWithMouse(e)
      });
  }

  clickWithkeyBoard(){
    let handicapePage = document.getElementsByClassName("handicapePage").length;
    if(this.mouseControlModeActivated || handicapePage>=1){
      const element = Array.from(this.listOfAllElementToNavigateIn.keys())[this.indexOfThehashMap] as HTMLElement;
      const callback = this.listOfAllElementToNavigateIn.get(element);
      callback(element);
    }
  }
  moveInPageWithMouse(event: MouseEvent){
    let handicapePage = document.getElementsByClassName("handicapePage").length;
    if(this.mouseControlModeActivated || handicapePage>=1){
      event.preventDefault();
      this.incrementeCurrentElement()
      this.updateSelected();
    }
  }

  updateSelected(){
    let handicapePage = document.getElementsByClassName("handicapePage").length;
    if(handicapePage>=1) {
      let lastSelected = document.getElementsByClassName("selected")[0];
      lastSelected.classList.remove('selected');
      const answerSelected = Array.from(this.listOfAllElementToNavigateIn.keys())[this.indexOfThehashMap] as HTMLElement;
      answerSelected.classList.add('selected');
    }
  }

  incrementeCurrentElement(){
    if(this.indexOfThehashMap >= this.listOfAllElementToNavigateIn.size-1) this.indexOfThehashMap = 0;
    else this.indexOfThehashMap+=1;
  }


  //Miss click Mode
  //----------------------------------------
  startMissClick(){
    this.missClickModeActivated = true;
    for(let i = 0 ; i < this.listOfAllElementToNavigateIn.size; i++) {
      const element: HTMLElement = Array.from(this.listOfAllElementToNavigateIn.keys())[i];
      if(element.classList.contains("missClickRange"))
          element.classList.add("missClickMode");
      else
        element.parentElement.classList.add("missClickMode");
    }
    this.addListenerToCountClick();
  }

  startMissClickVisible(){
    this.startMissClick()
    for(let i = 0 ; i < this.listOfAllElementToNavigateIn.size; i++) {
      const element: HTMLElement = Array.from(this.listOfAllElementToNavigateIn.keys())[0];
      element.classList.add("missClickModeVisible");
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

  downMissClickVisible(){
    this.downMissClick()
    let allMissClickDiv = document.getElementsByClassName("missClickRange");
    for (let i = 0 ; i < allMissClickDiv.length ; i++) {
      const currentMissClickDiv = allMissClickDiv[i];
      currentMissClickDiv.classList.remove("missClickModeVisible");
    }
  }

  private addListenerToCountClick() {
    document.body.addEventListener("click", e => {
      let handicapePage = document.getElementsByClassName("handicapePage").length;
      if(handicapePage>=1)
        this.nbclick++;
    });
  }

  private removeListenerToCountClick() {
    document.body.removeEventListener("click", e => {
      let handicapePage = document.getElementsByClassName("handicapePage").length;
      if(handicapePage>=1)
        this.nbclick++;
    });
  }

  //get x and y from cursor position
  getCursorPosition(residentId: string) {
    document.addEventListener("click", (event) => {
      let mousex = (event.clientX / window.innerWidth) * 100; // Gets Mouse X
      let mousey = (event.clientY / window.innerHeight) * 100; // Gets Mouse Y
      //console.log([mousex, mousey]); // Prints data

      const data : ClickData = {
        x:mousex,
        y:mousey,
        residentId:residentId,
        id:"0"
      }
      this.statsHandicapService.addData(data)
    });
  }


}
