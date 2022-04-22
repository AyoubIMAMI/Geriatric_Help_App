import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {QuizService} from "../../services/quiz.service";
import {Quiz} from "../../models/quiz.model";
import {Question} from "../../models/question.model";

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss']
})
export class CreateQuizComponent implements OnInit {
  /**
   * QuizForm: Object which manages the form in our component.
   * More information about Reactive Forms: https://angular.io/guide/reactive-forms#step-1-creating-a-formgroup-instance
   */
  public quizForm: FormGroup;
  public quizIsNotCreated: Boolean;
  public listQuestion: Question[];


  constructor(public formBuilder: FormBuilder, public quizService: QuizService) {
    this.listQuestion= new Array();
    this.quizIsNotCreated = true;
    this.quizForm = this.formBuilder.group({
      name: [''],
      theme: ['']
    });
    // You can also add validators to your inputs such as required, maxlength or even create your own validator!
    // More information: https://angular.io/guide/reactive-forms#simple-form-validation
    // Advanced validation: https://angular.io/guide/form-validation#reactive-form-validation
  }

  ngOnInit(): void {
  }

  addQuiz(): void {
    // We retrieve here the quiz object from the quizForm and we cast the type "as Quiz".
    let name = document.getElementById('name') as HTMLInputElement;
    let theme = document.getElementById('theme') as HTMLInputElement;
    if (theme.value != "" && name.value != "") {
      const quizToCreate: Quiz = this.quizForm.getRawValue() as Quiz;
      console.log(quizToCreate);
      quizToCreate.questions = this.listQuestion;
      this.quizIsNotCreated = false;
      this.quizService.addQuizComplet(quizToCreate);
      this.quizService.setCurrentQuiz(quizToCreate);
    }

  }
  addQuestionToList(question: Question){
    this.listQuestion.push(question);
    console.log(this.listQuestion);
  }

}
