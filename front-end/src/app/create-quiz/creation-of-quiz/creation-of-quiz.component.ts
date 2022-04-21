import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {QuizService} from "../../../services/quiz.service";
import {Quiz} from "../../../models/quiz.model";

@Component({
  selector: 'app-creation-of-quiz',
  templateUrl: './creation-of-quiz.component.html',
  styleUrls: ['./creation-of-quiz.component.scss']
})
export class CreationOfQuizComponent implements OnInit{
  // Note: We are using here ReactiveForms to create our form. Be careful when you look for some documentation to
  // avoid TemplateDrivenForm (another type of form)

  /**
   * QuizForm: Object which manages the form in our component.
   * More information about Reactive Forms: https://angular.io/guide/reactive-forms#step-1-creating-a-formgroup-instance
   */
  public quizForm: FormGroup;
  @Output() newItemEvent = new EventEmitter<string>();
  public quizIsNotCreated: Boolean;


  constructor(public formBuilder: FormBuilder, public quizService: QuizService) {
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
    if(theme.value != "" && name.value != ""){
      const quizToCreate: Quiz = this.quizForm.getRawValue() as Quiz;
      console.log(quizToCreate);
      this.quizService.addQuiz(quizToCreate);
      let quizId = this.quizService.getLastQuizIdAdded();
      this.newItemEvent.emit(quizId);
      this.quizIsNotCreated = false;
      quizToCreate.id = quizId;
      this.quizService.setCurrentQuiz(quizToCreate);
    }
  }

}
