import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {QuizService} from "../../services/quiz.service";
import {Quiz} from "../../models/quiz.model";
import {Question} from "../../models/question.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-create-quiz',
  templateUrl: './modification-quiz.component.html',
  styleUrls: ['./modification-quiz.component.scss']
})
export class ModificationQuizComponent implements OnInit {
  /**
   * QuizForm: Object which manages the form in our component.
   * More information about Reactive Forms: https://angular.io/guide/reactive-forms#step-1-creating-a-formgroup-instance
   */
  public quizForm: FormGroup;
  public quizIsNotCreated: Boolean;
  public listQuestion: Question[];
  public quiz: Quiz;


  constructor(public route: ActivatedRoute,public router : Router, public formBuilder: FormBuilder, public quizService: QuizService) {
    this.listQuestion= new Array();
    this.quizIsNotCreated = true;
    this.quizForm = this.formBuilder.group({
      name: [''],
      theme: ['']
    });
    // You can also add validators to your inputs such as required, maxlength or even create your own validator!
    // More information: https://angular.io/guide/reactive-forms#simple-form-validation
    // Advanced validation: https://angular.io/guide/form-validation#reactive-form-validation
    this.quizService.quizSelected$.subscribe((quiz) => {
      this.quiz = quiz;
      this.quizForm = this.formBuilder.group({
        questions: [quiz.questions],
        name: [quiz.name],
        theme: [quiz.theme],
        id:[quiz.id]
      });
      this.listQuestion=this.quiz.questions;});
    }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
  }

  updateQuiz(): void {
    // We retrieve here the quiz object from the quizForm and we cast the type "as Quiz".
    let name = document.getElementById('name') as HTMLInputElement;
    let theme = document.getElementById('theme') as HTMLInputElement;
    if (theme.value != "" && name.value != "") {
      const quizUpdate: Quiz = this.quizForm.getRawValue() as Quiz;
      console.log(quizUpdate);
      quizUpdate.questions = this.listQuestion;
      this.quizIsNotCreated = false;
      this.quizService.updateQuiz(quizUpdate);
      this.quizService.setCurrentQuiz(quizUpdate);
      this.router.navigate(['./quiz']);
    }

  }
  deleteAllQuiz(): void{
    this.quizService.deleteAllQuiz(this.quiz)
    this.router.navigate(['./quiz']);
  }
  addQuestionToList(question: Question){
    this.listQuestion.push(question);
    console.log(this.listQuestion);
  }
  deleteQuestion(question: Question){
    this.quizService.deleteQuestion(this.quiz,question);
  }

}
