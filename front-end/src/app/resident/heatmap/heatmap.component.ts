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
export class HeatmapComponent implements OnInit, AfterViewChecked {
  clickData : ClickData[];
  @Input() residentID : string;

  constructor(private route: ActivatedRoute, private statHandicapService: StatsHandicapService) {
    this.statHandicapService.clickData$.subscribe(
      (clickDataList) => this.clickData = clickDataList
    );
  }

  ngOnInit(): void {
    this.statHandicapService.retrieveClicks(this.residentID);
  }

  ngAfterViewChecked() {
    // Heatmap container
    const heatmap = document.getElementById("heatmap-container");

    // Adding circle
    const newCircle = document.createElement("div");
    newCircle.classList.add("circle");
    newCircle.style.left = "150px";
    newCircle.style.bottom = "150px";

    heatmap.appendChild(newCircle);
  }

}
