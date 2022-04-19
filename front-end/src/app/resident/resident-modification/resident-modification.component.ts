import { Component, OnInit } from '@angular/core';
import {Resident} from "../../../models/resident.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ResidentService} from "../../../services/resident.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-resident-modification',
  templateUrl: './resident-modification.component.html',
  styleUrls: []
})
export class ResidentModificationComponent implements OnInit {
  resident: Resident;
  nom : string = '';
  prenom : string = '';
  residentForm: FormGroup;

  constructor(public router : Router, public route : ActivatedRoute , public formBuilder: FormBuilder, public residentService: ResidentService) {
    this.residentService.residentSelected$.subscribe((resident : Resident) => this.resident = resident);

    this.residentForm = this.formBuilder.group({
      nom: [''],
      prenom: [''],
      picture: ['assets/images/square.svg'],
      handicap: [0]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.residentService.setSelectedResident(id);
  }

  deleteResident() {
    console.log("deleteResident", this.resident)
    this.residentService.deleteResident(this.resident);
    this.router.navigate(['./residents']);
  }
}
