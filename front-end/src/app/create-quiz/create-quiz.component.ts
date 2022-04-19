import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss']
})
export class CreateQuizComponent implements OnInit {
  public quizForm: FormGroup;
  public quizIsCreated: Boolean;

  constructor() {
    this.quizIsCreated = false;
  }

  ngOnInit(): void {
  }

  unlockQuestion(id: number){
    console.log(id);
    this.quizIsCreated = true;
  }


}
