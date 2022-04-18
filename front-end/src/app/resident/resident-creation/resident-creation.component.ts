import { Component, OnInit } from '@angular/core';
import {Resident} from "../../../models/resident.model";
import {ResidentService} from "../../../services/resident.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-resident-creation',
  templateUrl: './resident-creation.component.html',
  styleUrls: []
})
export class ResidentCreationComponent implements OnInit {
  resident: Resident;
  nom : string = '';
  prenom : string = '';
  residentForm: FormGroup;


  constructor(public router : Router , public formBuilder: FormBuilder, public residentService: ResidentService) {
    this.residentForm = this.formBuilder.group({
      nom: [''],
      prenom: [''],
      picture: ['assets/images/square.svg'],
      handicap: [0]
    });
  }

  ngOnInit(): void {
  }

  addResident() {
    const residentToAdd: Resident = this.residentForm.getRawValue() as Resident;
    console.log("addResident", residentToAdd)
    this.residentService.addResident(residentToAdd);
    this.router.navigate(['./residents']);
  }
}
