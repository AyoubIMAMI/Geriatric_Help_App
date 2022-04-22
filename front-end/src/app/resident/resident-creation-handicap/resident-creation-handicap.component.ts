import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-resident-creation-handicap',
  templateUrl: './resident-creation-handicap.component.html',
})
export class ResidentCreationHandicapComponent implements OnInit {

  @Input() inHandicap : string ;
  @Output() outHandicap = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  updateHandicap(handicap : string) : void {
    console.log("updateHandicap", handicap);
    this.outHandicap.emit(handicap);
  }

}
