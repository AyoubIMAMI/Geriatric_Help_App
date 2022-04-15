import { Component, OnInit } from '@angular/core';
import {Resident} from "../../../models/resident.model";
import {ResidentService} from "../../../services/resident.service";

@Component({
  selector: 'app-resident-creation',
  templateUrl: './resident-creation.component.html',
  styleUrls: []
})
export class ResidentCreationComponent implements OnInit {
  resident: Resident;
  newNom : string = '';
  newPrenom : string = '';

  constructor(public residentService: ResidentService) { }

  ngOnInit(): void {
  }

}
