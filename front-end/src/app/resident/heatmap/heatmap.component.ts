import {AfterViewChecked, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ResidentService} from "../../../services/resident.service";
import {StatsHandicapService} from "../../../services/statsHandicap.service";
import {ClickData} from "../../../models/clickData.model";

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeatmapComponent implements OnInit {
  clickData : ClickData[];

  constructor(private route: ActivatedRoute, private statHandicapService: StatsHandicapService) {

  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.statHandicapService.retrieveClicks(id);
    this.statHandicapService.clickData$.subscribe((clickDataList) =>{
        //console.log(clickDataList)
        this.clickData = clickDataList;
        this.addCircles();
      }
    );
  }


  addCircles() : void {
    // Heatmap container
    const heatmap = document.getElementById("heatmap-container");
    const heatmapHeight : number = heatmap.offsetHeight;
    const heatmapWidth : number = heatmap.offsetWidth;

    // Adding circle
    for(const click of this.clickData){
      const newCircle = document.createElement("div");
      newCircle.classList.add("circle");
      newCircle.style.left = (heatmapWidth * (click.x/100)).toString() + "px";
      newCircle.style.top = (heatmapHeight * (click.y/100)).toString() + "px";

      heatmap.appendChild(newCircle);
    }
  }

  onResize() : void {
    const elements = document.getElementsByClassName("circle");
    while (elements.length > 0) elements[0].remove();
    this.addCircles();
  }
}
