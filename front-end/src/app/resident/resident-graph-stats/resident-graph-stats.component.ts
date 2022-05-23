import {Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import * as Chart from 'chart.js';
import {HandicapService} from "../../../services/handicap.service";
import {StatsResident} from "../../../models/statsResident.model";

@Component({
  selector: 'app-resident-graph-stats-component',
  templateUrl: './resident-graph-stats.component.html',
  styleUrls: ['./resident-graph-stats.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResidentGraphStatsComponent implements OnInit {
  @ViewChild('barCanvas') private barCanvas: ElementRef;
  @Input() residentId: string;

  private allStatsResident: StatsResident[]
  private nbClick: number;
  private nbQuestionRealized: number
  private nbGoodAnswer:number;
  private aMonthInMilliseconde = 2629800000 as number;



  constructor(private handicapService: HandicapService) {
    this.handicapService.$arrayClick.subscribe((resident) => this.allStatsResident = resident);
    this.allStatsResident = [];
    this.nbClick = 0;
    this.nbQuestionRealized = 0;
    this.nbGoodAnswer = 0;
  }

  ngOnInit(){
    const startDateInput = document.getElementById("startDate")  as HTMLInputElement;
    const endDateInput = document.getElementById("endDate")  as HTMLInputElement;

    console.log("date = "+new Date().toDateString());
    let currentDate = new Date();

    startDateInput.value = this.convertDateToValideStringOneMonthAgo(currentDate);
    endDateInput.value = this.convertDateToValideString(currentDate);

    this.handicapService.getClickStatsForResident(this.residentId, new Date(-this.aMonthInMilliseconde), new Date());
    this.setupStats();

    let averageClickByQuestion = this.computeAverageClickByQuestion();
    let pourcentageGoodAnswer = this.computePourcentageGoodAnswer();

    this.fillBlankStats(averageClickByQuestion, pourcentageGoodAnswer);
  }

  fillBlankStats(averageClickByQuestion: number, pourcentageGoodAnswer: number){
    const averageElement = document.getElementById("clickParQuestion") as HTMLElement;
    averageElement.innerText = ""+averageClickByQuestion;

    const nbrQuestionElement = document.getElementById("nbrQuestion") as HTMLElement;
    nbrQuestionElement.innerText = ""+this.nbQuestionRealized;

    const pourcentageElement = document.getElementById("pourcentageGoodAnswer") as HTMLElement;
    pourcentageElement.innerText = ""+pourcentageGoodAnswer+"%";
  }

  computeAverageClickByQuestion(){
    return this.nbClick/this.nbQuestionRealized;
  }

  computePourcentageGoodAnswer(){
    return (this.nbGoodAnswer/this.nbQuestionRealized)*100;
  }

  searchByDate(){
    const startDateInput = document.getElementById("startDate")  as HTMLInputElement;
    const endDateInput = document.getElementById("endDate")  as HTMLInputElement;

    const startDate = new Date(startDateInput.value);
    const endDate = new Date(startDateInput.value);

    if(startDate.toDateString() != "Invalid Date" && endDate.toDateString() != "Invalid Date"){
      console.log("startDateValue: "+startDate);
      console.log("endDateValue: "+endDate);
      this.handicapService.getClickStatsForResident(this.residentId, startDate, endDate);
      this.setupStats();
    }
  }

  setupStats(){
    for(let i = 0; i < this.allStatsResident.length ; i++){
      const currentStat =this.allStatsResident[i];
      this.nbGoodAnswer += currentStat.numberOfGoodResponses;
      this.nbQuestionRealized = currentStat.numberOfPages;
      this.nbClick += currentStat.numberOfClicks;
    }
  }

  convertDateToValideString(date: Date):string{
    let year = "" + date.getFullYear()
    let month = "" + date.getMonth();
    if(+month < 10)
      month= "0"+month;
    let day = ""+ date.getDay();
    if(+day < 10)
      day= "0"+day;
    return year+"-"+month+"-"+day;
  }
  convertDateToValideStringOneMonthAgo(date: Date):string{
    let year = "" + date.getFullYear()
    let month = "" + (date.getMonth()-1);
    if(+month == 0)month = "12";
    if(+month < 10)
      month= "0"+month;
    let day = ""+ date.getDay();
    if(+day < 10)
      day= "0"+day;
    return year+"-"+month+"-"+day;
  }
}
