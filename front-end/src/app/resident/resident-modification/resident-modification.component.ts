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
  handicap : string = 'aucun';
  residentForm: FormGroup;


  constructor(public router : Router, public route : ActivatedRoute , public formBuilder: FormBuilder, public residentService: ResidentService) {
    const id = this.route.snapshot.paramMap.get('id');
    this.residentService.setSelectedResident(id);

  }
  ngOnInit(): void {
    this.residentService.residentSelected$.subscribe((resident : Resident) => {this.resident = resident
      this.residentForm = this.formBuilder.group({
        nom: [resident.nom],
        prenom: [resident.prenom],
        picture: [resident.picture],
        handicap: [resident.handicap],
        id:[resident.id]
      });});
  }

  updateHandicap(handicap:string): void{
    this.resident.handicap=handicap
  }

  deleteResident() {
    console.log("deleteResident", this.resident)
    this.residentService.deleteResident(this.resident);
    this.router.navigate(['./residents']);
  }

  updateResident() {
    const residentToAdd: Resident = this.residentForm.getRawValue() as Resident
    residentToAdd.handicap=this.resident.handicap
    console.log(residentToAdd)
    this.residentService.updateResident(residentToAdd);
    this.router.navigate(['./residents']);
  }
}
