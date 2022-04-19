import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from 'src/models/quiz.model';
import { Question } from 'src/models/question.model';

@Component({
  selector: 'app-create-new-question',
  templateUrl: './create-new-question.component.html',
  styleUrls: ['./create-new-question.component.scss']
})
export class createNewQuestionComponent implements OnInit {
  @Input()
  quiz: Quiz;
  

  public questionForm: FormGroup;
  isCorrectTab: any = [
    {name:'isCorrect', id:1, selected: true}, 
    {name:'isCorrect', id:2, selected: false},
    {name:'isCorrect', id:3, selected: false},  
    {name:'isCorrect', id:4, selected: false}
  ]

  constructor(public formBuilder: FormBuilder, public quizService: QuizService) {
    this.questionForm = this.formBuilder.group({
      question:'',
      answer: [''],
      isCorrectTab: this.createCorrectTab(this.isCorrectTab)
    });
  }

  // Create form array
  createCorrectTab(comboBoxList): FormArray{
    const arr = comboBoxList.map(isCorrect => {
      return new FormControl(isCorrect.selected)
    });
    return new FormArray(arr);
  }

  private initializeQuestionForm(): void {
    this.questionForm = this.formBuilder.group({
      label: ['', Validators.required],
      answers: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
  }

  get answers(): FormArray {
    return this.questionForm.get('answers') as FormArray;
  }

  private createAnswer(): FormGroup {
    return this.formBuilder.group({
      value: '',
      isCorrect: false,
    });
  }

  addAnswers(): void {
    for(let k=0;k<4;k++)
      this.answers.push(this.createAnswer());
  }

  addQuestion(): void {
    if (this.questionForm.valid) {
      const question = this.questionForm.getRawValue() as Question;
      this.quizService.addQuestion(this.quiz, question);
      this.initializeQuestionForm();
    }
  }
}
