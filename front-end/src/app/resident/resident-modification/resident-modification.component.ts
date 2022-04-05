import { Component, OnInit } from '@angular/core';
import {Resident} from "../../../models/resident.model";
import {ActivatedRoute} from "@angular/router";
import {ResidentService} from "../../../services/resident.service";

@Component({
  selector: 'app-resident-modification',
  templateUrl: './resident-modification.component.html',
  styleUrls: []
})
export class ResidentModificationComponent implements OnInit {

  public resident: Resident;

  constructor(private route: ActivatedRoute, private residentService: ResidentService) {
    this.residentService.residentSelected$.subscribe((resident) => this.resident = resident);
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.residentService.setSelectedResident(id);
  }
}
