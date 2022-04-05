import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Resident } from 'src/models/resident.model';
import { ResidentService } from 'src/services/resident.service';

@Component({
  selector: 'app-residents-display',
  templateUrl: './residents-display.component.html',
  styleUrls: ['./residents-display.component.scss']
})
export class ResidentsDisplayComponent implements OnInit {

  public residentList: Resident[] = [];

  constructor(private router: Router, public residentService: ResidentService) {
    this.residentService.residents$.subscribe((residents: Resident[]) => {
      this.residentList = residents;
    });
  }

  ngOnInit(): void {
  }

}
