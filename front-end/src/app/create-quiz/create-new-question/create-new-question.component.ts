import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from 'src/models/quiz.model';
import { Answer, Question } from 'src/models/question.model';
import {resetFakeAsyncZone} from "@angular/core/testing";

@Component({
  selector: 'app-create-new-question',
  templateUrl: './create-new-question.component.html',
  styleUrls: ['./create-new-question.component.scss', '../create-quiz.component.scss']
})
export class createNewQuestionComponent implements OnInit {
  public quiz: Quiz;
  @Output() newQuestionEvent = new EventEmitter<Question>();


  public questionForm: FormGroup;

  public answersForm0:FormGroup;
  public answersForm1:FormGroup;
  public answersForm2:FormGroup;
  public answersForm3:FormGroup;

  public answersForm:FormGroup;
  //public listName: string[] = ['answersForm0', 'answersForm1', 'answersForm2', 'answersForm3'];
  //public answersForms: FormGroup[] = new Array(4);




  constructor(public formBuilder: FormBuilder, public quizService: QuizService) {
    this.quiz = quizService.getCurrentQuiz()
    this.questionForm = this.formBuilder.group({
      label:'',
    });
    this.answersForm0 = this.formBuilder.group({
      value:'',
      isCorrect: false
    });
    this.answersForm1 = this.formBuilder.group({
      value:'',
      isCorrect: false
    });
    this.answersForm2 = this.formBuilder.group({
      value:'',
      isCorrect: false
    });
    this.answersForm3 = this.formBuilder.group({
      value:'',
      isCorrect: false
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
    if (this.questionForm.valid && this.allAnswerFormValid()) {
      const question = this.questionForm.getRawValue() as Question;
      const answers = this.formToAnswers();

      let idTrueAnswer = this.getIdTrueAnswer();
      answers[idTrueAnswer].isCorrect=true
      question.answers = answers;
      this.newQuestionEvent.emit(question);
      //this.quizService.addQuestion(this.quiz, question);
      console.log(question);
      this.resetForm();
    }
  }

  resetForm(){
    let allInput = document.getElementsByTagName("input");
    let radios = document.querySelectorAll('input[type="radio"]')

    let question = document.getElementsByTagName("textarea")[0];
    question.value="";
    for(let  i =0 ; i < allInput.length ; i++) {
      let input = allInput[i] as HTMLInputElement;
      if(input.id != "name" && input.id != "theme")
        input.value="";
    }
    for(let  i =0 ; i < radios.length ; i++) {
      let input = radios[i] as HTMLInputElement;
        input.checked = false;
    }
  }

  allAnswerFormValid(): Boolean{
    if(this.answersForm0.invalid || this.answersForm1.invalid || this.answersForm2.invalid || this.answersForm3.invalid) return false;
    return true;
  }

  formToAnswers(): Answer[]{
    let answers:  Answer[] = new Array();
    answers.push(this.answersForm0.getRawValue() as Answer);
    answers.push(this.answersForm1.getRawValue() as Answer);
    answers.push(this.answersForm2.getRawValue() as Answer);
    answers.push(this.answersForm3.getRawValue() as Answer);
    return answers;
  }

  getIdTrueAnswer(): number {
    let allRadio = document.querySelectorAll('input[name="isCorrect"]');
    for (let i = 0 ; i < allRadio.length ; i++) {
      let currentButton = allRadio[i] as HTMLInputElement;
      if (currentButton.checked) {
        return i;
      }
    }
    return -1
  }

  checkRadio(checkedId) : void {
    let radioButtons = document.querySelectorAll('input[name="isCorrect"]');
    // @ts-ignore
    for (let radioButton of radioButtons) {
      if (radioButton.id != checkedId) {
        radioButton.checked = false;
      }
    }
  }
}


