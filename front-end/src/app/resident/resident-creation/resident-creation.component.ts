import { Component, OnInit } from '@angular/core';
import {Resident} from "../../../models/resident.model";

@Component({
  selector: 'app-resident-creation',
  templateUrl: './resident-creation.component.html',
  styleUrls: []
})
export class ResidentCreationComponent implements OnInit {
  resident: Resident;

  constructor() { }

  ngOnInit(): void {
  }

}
