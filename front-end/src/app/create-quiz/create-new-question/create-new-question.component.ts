import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from 'src/models/quiz.model';
import { Answer, Question } from 'src/models/question.model';

@Component({
  selector: 'app-create-new-question',
  templateUrl: './create-new-question.component.html',
  styleUrls: ['./create-new-question.component.scss']
})
export class createNewQuestionComponent implements OnInit {
  @Input()
  quiz: Quiz;
  

  public questionForm: FormGroup;
  public answersForm:FormGroup[] = new Array(4) 



  constructor(public formBuilder: FormBuilder, public quizService: QuizService) {
    this.questionForm = this.formBuilder.group({
      question:'',
    });
    for(let i = 0 ; i < 4 ; i++){
      this.answersForm.push(this.formBuilder.group({
        answer:'',
        isCorrect: false
      }));
    }

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
      answers[idTrueAnswer].isCorrect=true;
      this.quizService.addQuestion(this.quiz, question);
      this.quizService.addAnswers(this.quiz, question, answers);
    }
  }
  allAnswerFormValid(): Boolean{
    for(let i = 0 ; i < 4 ; i++){
      if(this.answersForm[i].invalid) return false;
    }
    return true;
  }

  formToAnswers(): Answer[]{
    let answers:  Answer[];
    for(let i = 0 ; i < 4 ; i++){
      const answer = this.answersForm[i].getRawValue() as Answer;
      answers.push(answer);
    }
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

}


