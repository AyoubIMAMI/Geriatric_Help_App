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

  private startDateInput: HTMLInputElement;
  private endDateInput: HTMLInputElement;

  private startDate: Date;
  private endDate: Date;



  constructor(private handicapService: HandicapService) {
    this.handicapService.$arrayClick.subscribe((resident) => this.allStatsResident = resident);
    this.allStatsResident = [];
    this.nbClick = 0;
    this.nbQuestionRealized = 0;
    this.nbGoodAnswer = 0;

    this.endDate = new Date();
    this.startDate = new Date(this.convertDateToValideString(this.endDate));
  }

  ngOnInit(){
    console.log("date = "+new Date().toDateString());

    this.endDate = new Date();
    this.startDate = new Date(this.convertDateToValideString(this.endDate));
    this.startDateInput = document.getElementById("startDate") as HTMLInputElement;
    this.endDateInput = document.getElementById("endDate") as HTMLInputElement;

    this.startDateInput.value = this.convertDateToValideString(this.startDate);
    this.endDateInput.value = this.convertDateToValideString(this.endDate);

    this.handicapService.getClickStatsForResident(this.residentId, this.startDate, this.endDate);
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
    this.startDate = new Date(this.startDateInput.value);
    this.endDate = new Date(this.endDateInput.value);

    console.log("startDate = "+this.convertDateToValideString(this.startDate));
    console.log("endDate = "+this.convertDateToValideString(this.endDate));


    if(this.startDate.toDateString() != "Invalid Date" && this.endDate.toDateString() != "Invalid Date"){
      console.log("startDateValue: "+this.startDate);
      console.log("endDateValue: "+this.endDate);
      this.handicapService.getClickStatsForResident(this.residentId, this.startDate, this.endDate);
      this.setupStats();
    }
  }

  setupStats(){
    console.log("this.allStatsResident = "+this.allStatsResident);
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
    let day = ""+ date.getDate();
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
    let day = ""+ date.getDate();
    if(+day < 10)
      day= "0"+day;
    return year+"-"+month+"-"+day;
  }
}
