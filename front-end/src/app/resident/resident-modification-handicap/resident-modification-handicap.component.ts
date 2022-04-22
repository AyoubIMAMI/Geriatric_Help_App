import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-resident-modification-handicap',
  templateUrl: './resident-modification-handicap.component.html',
  styleUrls: []
})
export class ResidentModificationHandicapComponent implements OnInit {
  @Input() inHandicap : string;
  @Output() outHandicap = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  updateHandicap(handicap : string) : void {
    console.log("updateHandicap", handicap);
    this.outHandicap.emit(handicap);
  }
  isHandicap(handicap : string) : boolean {
    console.log(this.inHandicap)
    return(this.inHandicap==handicap);

  }

}
