import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Resident} from "../../../models/resident.model";

@Component({
  selector: 'app-resident-profile-modification',
  templateUrl: './resident-profile-modification.component.html',
  styleUrls: []
})
export class ResidentProfileModificationComponent implements OnInit {
  @Input() resident : Resident;
  @Output() nomValueEvent = new EventEmitter<string>();
  @Output() prenomValueEvent = new EventEmitter<string>();
  nomValue : String = '';
  prenomValue : String = '';

  constructor() { }

  ngOnInit(): void {
    if(this.resident != null){
      this.nomValue = this.resident.nom;
      this.prenomValue = this.resident.prenom;
    }
  }
}

