import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-resident-handicap',
  templateUrl: './resident-handicap.component.html',
  styleUrls: []
})
export class ResidentHandicapComponent implements OnInit {
  @Input() handicap : string = 'Aucun';

  constructor() { }

  ngOnInit(): void {
  }

}
