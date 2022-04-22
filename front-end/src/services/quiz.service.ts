import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { Answer, Question } from '../models/question.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  addAnswers(quiz: Quiz, questionId: number, answers: Answer[]): void {
    for(let  i = 0 ; i < 4 ; i++){
      const answerUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath+ '/' +questionId +'/' +this.answersPath;
      this.http.post<Question>(answerUrl, answers[i], this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
    }
  }

  /*
   Services Documentation:
   https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  /*
   The list of quiz.
   The list is retrieved from the mock.
   */
  private quizzes: Quiz[] = [];
  private questions: Question[] = [];
  private currentQuiz: Quiz;
  private lastQuestionAdded: Question;


  /*
   Observable which contains the list of the quiz.
   Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public quizzes$: BehaviorSubject<Quiz[]>
    = new BehaviorSubject(this.quizzes);

  public quizSelected$: Subject<Quiz> = new Subject();
  public questionSelected$: Subject<Question[]> = new Subject();

  private quizUrl = serverUrl + '/quizzes';
  private questionsPath = 'questions';
  private answersPath = 'answers';



  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.retrieveQuizzes();
  }

  retrieveQuizzes(): void {
    this.http.get<Quiz[]>(this.quizUrl).subscribe((quizList) => {
      this.quizzes = quizList;
      this.quizzes$.next(this.quizzes);
    });
  }

  addQuiz(quiz: Quiz): void {
    this.http.post<Quiz>(this.quizUrl, quiz, this.httpOptions).subscribe(() => this.retrieveQuizzes());
  }

  setSelectedQuestion(quizId: string): void {
    const urlWithId = this.quizUrl + '/' + quizId +'/questions/';
    this.http.get<Question[]>(urlWithId).subscribe((question) => {
      this.questionSelected$.next(question);
    });
  }

  setSelectedQuiz(quizId: string): void {
    const urlWithId = this.quizUrl + '/' + quizId;
    this.http.get<Quiz>(urlWithId).subscribe((quiz) => {
      this.quizSelected$.next(quiz);
    });
  }

  deleteQuiz(quiz: Quiz): void {
    const urlWithId = this.quizUrl + '/' + quiz.id;
    this.http.delete<Quiz>(urlWithId, this.httpOptions).subscribe(() => this.retrieveQuizzes());
  }

  addQuizComplet(quiz: Quiz): void {
    const questionUrl = this.quizUrl +'/';
    console.log(quiz.id);
    this.http.post<Quiz>(questionUrl,quiz,this.httpOptions).subscribe(() => this.retrieveQuizzes());
    console.log(questionUrl)
    console.log(quiz)
  }

  addQuestion(quiz: Quiz, question: Question): void {
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath;
    this.http.post<Question>(questionUrl, question, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
    this.lastQuestionAdded = question;
  }

  deleteQuestion(quiz: Quiz, question: Question): void {
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id;
    this.http.delete<Question>(questionUrl, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  setCurrentQuiz(quiz: Quiz): void {
    this.currentQuiz = quiz;
  }
  getCurrentQuiz(): Quiz {
    return this.currentQuiz;
  }


  getLastQuizIdAdded(): string{
    return this.quizzes[this.quizzes.length-1].id;
  }

  getLastQuestionIdAdded(): string{
    return this.lastQuestionAdded.id;
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
