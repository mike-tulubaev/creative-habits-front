import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { combineLatest, Observable } from 'rxjs';
import { delay, first, map, tap, withLatestFrom } from 'rxjs/operators';
import { InterviewStateModel } from 'src/app/core/models/interview-state.model';
import {
  PickQuestion,
  Question,
  QuestionTypeEnum,
  TextQuestion,
} from 'src/app/core/models/question.model';
import { SetShowMissed } from 'src/app/core/ngxs/interview/interview.actions';
import { InterviewService } from 'src/app/core/services/interview.service';

interface QuestionWithAnswers {
  text: string;
  answers: string[];
  name: string;
}

@Component({
  selector: '[app-question]',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit, OnChanges {
  private questionsState: Observable<Question[]> = this.store.select(
    (state) => state.questions
  );
  private interviewState: Observable<InterviewStateModel> = this.store.select(
    (state) => state.interview
  );

  @Input() question: Question | null = null;
  @Input() index: number | null = null;

  questionTypes = QuestionTypeEnum;
  pickAnswerControl: FormControl = new FormControl();
  textAnswerControl: FormControl = new FormControl();
  prevAnswer: string = '';
  showMissed: boolean = false;
  missed = {
    count: this.interviewState.pipe(
      map(
        (interview) =>
          interview.numOfQuestions - Object.keys(interview.answers).length
      )
    ),
    firstIndex: combineLatest([this.questionsState, this.interviewState]).pipe(
      map(
        ([qustions, interview]) =>
          qustions.findIndex((q) => !interview.answers[q.text]) + 1
      )
    ),
  };

  constructor(
    private store: Store,
    private router: Router,
    private interviewService: InterviewService
  ) {}

  ngOnInit(): void {
    this.pickAnswerControl.valueChanges
      .pipe(
        tap(() => {
          this.prevAnswer = '';
        }),
        delay(250)
      )
      .subscribe((answer) => {
        if (this.question) {
          this.interviewService
            .setAnswer(this.question, answer)
            .subscribe(() => this.checkProgess());
        }
      });
  }

  ngOnChanges(): void {
    this.interviewState.pipe(first()).subscribe((interview) => {
      if (this.question) {
        this.prevAnswer = interview.answers[this.question?.text]?.toString();
      }
    });

    const answers = this.store.selectSnapshot(
      (state) => state.interview.answers
    );
    const questionText = this.question?.text || '';
    if (this.pickAnswerControl && questionText && answers[questionText]) {
      this.pickAnswerControl.reset(answers[questionText], { emitEvent: false });
    } else {
      this.pickAnswerControl.reset(null, { emitEvent: false });
    }
  }

  getPickQuestion(commonQuestion: Question | null) {
    const pickQuestion = <PickQuestion>commonQuestion;
    return {
      text: pickQuestion.text,
      answers: pickQuestion.answers,
      name: `q${this.index}`,
    } as QuestionWithAnswers;
  }

  hideMissed() {
    this.showMissed = false;
  }

  submitTextAnswer() {
    if (this.question) {
      this.interviewService.setAnswer(
        this.question,
        this.textAnswerControl.value
      );
    }
    combineLatest([this.questionsState, this.interviewState])
      .pipe(first())
      .subscribe(([questions, interview]) => {
        const answeredQuestions = Object.keys(interview.answers);
        if (
          questions.find(
            (q) =>
              !answeredQuestions.includes(q.text) ||
              (q instanceof TextQuestion && !(<TextQuestion>q).optional)
          )
        ) {
          this.showMissed = true;
          this.store.dispatch(new SetShowMissed(true));
        } else {
          this.interviewService.interviewCompleted$.next();
        }
      });
  }

  finishInterview() {
    this.interviewState.pipe(first()).subscribe((interview) => {
      if (interview.progress === 1) {
        this.interviewService.interviewCompleted$.next();
      }
    });
  }

  private checkProgess() {
    this.interviewState.pipe(first()).subscribe((interview) => {
      if (this.index) {
        if (interview.progress === 1) {
          this.interviewService.interviewCompleted$.next();
        } else if (this.index < interview.numOfQuestions) {
          this.router.navigate(['/survey', this.index + 1]);
        } else {
          this.showMissed = true;
          this.store.dispatch(new SetShowMissed(true));
        }
      }
    });
  }
}
