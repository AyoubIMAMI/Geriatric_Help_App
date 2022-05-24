import {Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
} from 'chart.js';
import {StatsResident} from "../../../../models/statsResident.model";

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
);

@Component({
  selector: 'app-resident-charts-component',
  templateUrl: './resident-charts.component.html',
  styleUrls: ['./resident-charts.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResidentChartsComponent implements OnInit {
  @Input() dailyStats: StatsResident[];
  private label: string[]
  private data: number[]

  constructor() {

  }

  ngOnInit(){
    this.fillLabel();
    const myChart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: this.label,
        datasets: [{
          label: '# of Votes',
          data: this.data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  fillLabel(){
    for (let i = 0; i < this.dailyStats.length; i++) {
      let currentStats = this.dailyStats[i] as StatsResident;
      let date = currentStats.jour +"/"+ currentStats.mois +"/"+currentStats.annee;
      this.label.push(date);
      this.data.push(currentStats.numberOfClicks / currentStats.numberOfPages);
    }

  }


}
