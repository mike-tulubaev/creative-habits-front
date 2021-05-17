import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { EMPTY, Observable, Subject } from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  first,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ENDPOINTS } from '../endpoints';
import { InterviewStateModel } from '../models/interview-state.model';
import { Question } from '../models/question.model';
import { InterviewResultModel } from '../models/interview-result.model';
import {
  SetAnswerAction,
  SetInterviewResultAction,
} from '../ngxs/interview/interview.actions';
import { SetQuestionsAction } from '../ngxs/questions/questions.actions';
import { Router } from '@angular/router';
import { SetIsLoadingAction } from '../ngxs/app/app.actions';
import { CreativeSpeciesEnum } from '../models/creative-species.enum';

@Injectable({
  providedIn: 'root',
})
export class InterviewService {
  private questionsGetRequest: Observable<Question[]> = this.http.get<
    Question[]
  >('/assets/questions.json');

  interviewCompleted$: Subject<null> = new Subject();

  constructor(
    private http: HttpClient,
    private store: Store,
    private router: Router
  ) {}

  loadQuestionList() {
    this.questionsGetRequest.subscribe((list) =>
      this.store.dispatch(new SetQuestionsAction(list))
    );
  }

  getQuestion(index: number): Observable<Question> {
    return this.store
      .select((state) => state.questions)
      .pipe(map((questions) => questions[index - 1]));
  }

  getProgress(): Observable<number> {
    return this.store
      .select((state) => state.interview as InterviewStateModel)
      .pipe(
        map((interview) => interview.progress),
        distinctUntilChanged()
      );
  }

  setAnswer(question: Question, answer: string) {
    return this.store.dispatch(new SetAnswerAction({ question, answer }));
  }

  sendInterview() {
    return this.store
      .select((state) => state.interview as InterviewStateModel)
      .pipe(
        tap(() => this.store.dispatch(new SetIsLoadingAction(true))),
        first(),
        switchMap((interview) =>
          this.http.post<InterviewResultModel>(
            environment.apiUrl + ENDPOINTS.QUESTIONS,
            interview.answers
          )
        ),
        catchError((err) => {
          this.store.dispatch(new SetIsLoadingAction(false));
          return EMPTY;
        }),
        tap(() => this.store.dispatch(new SetIsLoadingAction(false)))
      )
      .subscribe((result) => {
        this.store.dispatch(new SetInterviewResultAction(result));
        if (
          !!result.Creative_Species &&
          result.Creative_Species !== CreativeSpeciesEnum.RARE_BREED
        ) {
          this.router.navigate(['/profile-reveal']);
        } else {
          this.router.navigate(['/profile-reveal', 'rare-breed']);
        }
      });
  }

  getResultById$(id: string) {
    return this.http.get<InterviewResultModel>(
      environment.apiUrl + ENDPOINTS.QUESTIONS + `/${id}`
    );
  }

  downloadResults(id: string) {
    return this.http.get(environment.apiUrl + ENDPOINTS.DOWNLOAD + '/' + id, {
      responseType: 'arraybuffer',
    });
  }
}
