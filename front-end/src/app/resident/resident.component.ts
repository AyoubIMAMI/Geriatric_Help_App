import { Component, OnInit } from '@angular/core';
enum Handicap {
  essentiel = 'Tremblement essentiel',
  intentionnel = 'Tremblement intentionnel',
  attitude = 'Tremblement attitude',
}
const handicapList: Array<string> = Object.keys(Handicap).filter(key => isNaN(+key));

@Component({
  selector: 'app-resident',
  templateUrl: './resident.component.html',
  styleUrls: ['./resident.component.scss']
})
export class ResidentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
