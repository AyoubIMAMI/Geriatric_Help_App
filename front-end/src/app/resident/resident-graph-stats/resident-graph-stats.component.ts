import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
//import * as Chart from 'chart.js';

@Component({
  selector: 'app-resident-graph-stats-component',
  templateUrl: './resident-graph-stats.component.html',
  styleUrls: ['./resident-graph-stats.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResidentGraphStatsComponent implements OnInit {
  @ViewChild('barCanvas') private barCanvas: ElementRef;
  barChart: any;

  private nbClick: number[];
  private nbQuestionRealized: number
  private nbGoodAnswer:number;


  constructor() { }

  ngOnInit(){

    //this.barChartMethod();


    this.nbClick = [10,45,1,23,47];
    this.nbQuestionRealized = 10;
    this.nbGoodAnswer = 4;

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
    let totalClick = 0;
    for(let i = 0; i < this.nbClick.length ; i++){
      totalClick+=this.nbClick[i];
    }
    return totalClick/this.nbQuestionRealized;
  }

  computePourcentageGoodAnswer(){
    return (this.nbGoodAnswer/this.nbQuestionRealized)*100;
  }
}
