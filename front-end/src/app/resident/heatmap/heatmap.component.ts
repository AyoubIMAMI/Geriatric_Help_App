import {AfterViewChecked, Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeatmapComponent implements OnInit, AfterViewChecked {

  constructor() { }

  ngOnInit(): void {
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
