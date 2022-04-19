import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-resident-modification-handicap',
  templateUrl: './resident-modification-handicap.component.html',
  styleUrls: []
})
export class ResidentModificationHandicapComponent implements OnInit {
  @Input() inHandicap : number = 0;
  @Output() outHandicap = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  updateHandicap(handicap : string) : void {
    console.log("updateHandicap", handicap);
    this.outHandicap.emit(handicap);
  }

}
