import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Stat} from "../../models/stat.model";
import {Resident} from "../../models/resident.model";
import {ResidentService} from "../../services/resident.service";
import {HandicapService} from "../../services/handicap.service";

@Component({
  selector: 'app-end-quiz',
  templateUrl: './end-quiz.component.html',
  styleUrls: ['./end-quiz.component.scss']
})


export class EndQuizComponent implements OnInit {
  stat: Stat;
  quizId : string = '';
  residentId : string = '';
  public resident: Resident;

  constructor(private route: ActivatedRoute, private router: Router, public formBuilder: FormBuilder, public statService: HandicapService, private residentService: ResidentService) {
    this.quizId = this.route.snapshot.paramMap.get('id');
    this.residentId = this.route.snapshot.paramMap.get('residentid')
  }

  ngOnInit(): void {
    this.addStat();
    this.residentService.setSelectedResident(this.residentId);
    this.residentService.residentSelected$.subscribe((resident) => this.resident = resident);
  }



  addStat() {
    const statToAdd: Stat = {
      residentId: this.residentId,
      quizzId: this.quizId
    }
    this.statService.addStat(statToAdd);
  }

}
