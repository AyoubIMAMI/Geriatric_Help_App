import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { Answer, Question } from '../models/question.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  /*
   Services Documentation:
   https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  /*
   The list of quiz.
   The list is retrieved from the mock.
   */
  private questions: Question[] = [];
  private currentQuestion: Question;


  /*
   Observable which contains the list of the quiz.
   Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public questions$: BehaviorSubject<Question[]>
    = new BehaviorSubject(this.questions);

  public questionSelected$: Subject<Question> = new Subject();

  private questionUrl = serverUrl + '/questions';
  private questionsPath = 'questions';
  private answersPath = 'answer ';




  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.retrieveQuestion();
  }

  retrieveQuestion(): void {
    this.http.get<Question[]>(this.questionUrl).subscribe((questionList) => {
      this.questions = questionList;
      this.questions$.next(this.questions);
    });
  }

  addQuestion(question: Question): void {
    this.http.post<Quiz>(this.questionUrl, question, this.httpOptions).subscribe(() => this.retrieveQuestion());
  }

  setSelectedQuestion(questionId: string): void {
    const urlWithId = this.questionUrl + '/' + questionId;
    this.http.get<Question>(urlWithId).subscribe((question) => {
      this.questionSelected$.next(question);
    });
  }

  deleteQuestion(question: Question): void {
    const urlWithId = this.questionUrl + '/' + question.id;
    this.http.delete<Question>(urlWithId, this.httpOptions).subscribe(() => this.retrieveQuestion());
  }

  addAnswer(question: Question, answer: Answer): void {
    const questionUrl = this.questionUrl + '/' + question.id + '/' + this.answersPath;
    this.http.post<Question>(questionUrl, question, this.httpOptions).subscribe(() => this.setSelectedQuestion(question.id));
  }

  deleteAnswer(question: Question, answer: Answer): void {
    const questionUrl = this.questionUrl + '/' + question.id + '/' + this.answersPath + '/' + answer.id;
    this.http.delete<Question>(questionUrl, this.httpOptions).subscribe(() => this.setSelectedQuestion(question.id));
  }

  setCurrentQuestion(question: Question): void {
    this.currentQuestion = question;
  }
  getCurrentQuestion(): Question {
    return this.currentQuestion;
  }

  getLastQuestionIdAdded(): string{
    return this.questions[this.questions.length-1].id;
  }

  /*
  Note: The functions below don't interact with the server. It's an example of implementation for the exercice 10.
  addQuestion(quiz: Quiz, question: Question) {
    quiz.questions.push(question);
    const index = this.quizzes.findIndex((q: Quiz) => q.id === quiz.id);
    if (index) {
      this.updateQuizzes(quiz, index);
    }
  }

  deleteQuestion(quiz: Quiz, question: Question) {
    const index = quiz.questions.findIndex((q) => q.label === question.label);
    if (index !== -1) {
      quiz.questions.splice(index, 1)
      this.updateQuizzes(quiz, index);
    }
  }

  private updateQuizzes(quiz: Quiz, index: number) {
    this.quizzes[index] = quiz;
    this.quizzes$.next(this.quizzes);
  }
  */
}
