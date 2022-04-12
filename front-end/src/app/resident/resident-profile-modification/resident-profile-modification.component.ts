import {Component, Input, OnInit, Output} from '@angular/core';
import {Resident} from "../../../models/resident.model";

@Component({
  selector: 'app-resident-profile-modification',
  templateUrl: './resident-profile-modification.component.html',
  styleUrls: []
})
export class ResidentProfileModificationComponent implements OnInit {
  @Input() resident : Resident;
  @Output() nom : string = '';
  @Output() prenom : string = '';

  oldNom : string = 'Nom';
  oldPrenom : string = 'Prénom';

  constructor() { }

  ngOnInit(): void {
    if(this.resident != null){
      this.oldNom = this.resident.nom;
      this.oldPrenom = this.resident.prenom;
    }
  }
}

