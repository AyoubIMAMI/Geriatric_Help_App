import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Resident } from 'src/models/resident.model';
import { ResidentService } from 'src/services/resident.service';
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

  public resident: Resident;

  constructor(private route: ActivatedRoute, private residentService: ResidentService) {
    this.residentService.residentSelected$.subscribe((resident) => this.resident = resident);

  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.residentService.setSelectedResident(id);
  }

}
