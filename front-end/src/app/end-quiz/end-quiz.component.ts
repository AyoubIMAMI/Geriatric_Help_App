import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Stat} from "../../models/stat.model";
import {StatService} from "../../services/stat.service";

@Component({
  selector: 'app-end-quiz',
  templateUrl: './end-quiz.component.html',
  styleUrls: ['./end-quiz.component.scss']
})
export class EndQuizComponent implements OnInit {
  stat: Stat;
  quizId : string = '';
  residentId : string = '';

  constructor(private route: ActivatedRoute, private router: Router, public formBuilder: FormBuilder, public statService: StatService) {
    this.quizId = this.route.snapshot.paramMap.get('id');
    this.residentId = this.route.snapshot.paramMap.get('residentid');
  }

  ngOnInit(): void {
    this.addStat();
    console.log(this.stat);
  }

  addStat() {
    const statToAdd: Stat = {
      residentId: this.residentId,
      quizzId: this.quizId
    }
    console.log("addStat", statToAdd)
    this.statService.addStat(statToAdd);
  }

}
