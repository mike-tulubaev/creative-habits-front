import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { InterviewStateModel } from '../../models/interview-state.model';
import { InterviewService } from '../../services/interview.service';
import {
  DownloadResults,
  SetAnswerAction,
  SetInterviewResultAction,
  SetNumberOfQuestionsAction,
  SetShowMissed,
} from './interview.actions';
import { saveAs } from 'file-saver';
import { SetIsLoadingAction } from '../app/app.actions';

const QUESTION_TOKEN: StateToken<InterviewStateModel> = new StateToken(
  'interview'
);

@State<InterviewStateModel>({
  name: QUESTION_TOKEN,
  defaults: {
    id: '',
    answers: {},
    progress: 0,
    showMissed: false,
    numOfQuestions: 0,
    result: null,
  },
})
@Injectable()
export class InterviewState {
  @Selector()
  static result(state: InterviewStateModel) {
    return state.result;
  }

  constructor(private service: InterviewService) {}

  @Action(SetAnswerAction)
  public setAnswer(
    ctx: StateContext<InterviewStateModel>,
    action: SetAnswerAction
  ) {
    const state = ctx.getState();
    const answers = { ...state.answers };
    answers[action.payload.question.text] = action.payload.answer;
    ctx.patchState({
      answers,
      progress: Object.keys(answers).length / state.numOfQuestions,
    });
  }

  @Action(SetNumberOfQuestionsAction)
  public setNumberOfQuestions(
    ctx: StateContext<InterviewStateModel>,
    action: SetNumberOfQuestionsAction
  ) {
    ctx.patchState({
      numOfQuestions: action.numOfQuestions,
    });
  }

  @Action(SetInterviewResultAction)
  public setInterviewResult(
    ctx: StateContext<InterviewStateModel>,
    action: SetInterviewResultAction
  ) {
    ctx.patchState({
      id: action.result.id,
      result: action.result,
    });
  }

  @Action(SetShowMissed)
  public setShowMissed(
    ctx: StateContext<InterviewStateModel>,
    action: SetShowMissed
  ) {
    ctx.patchState({
      showMissed: action.payload,
    });
  }

  @Action(DownloadResults)
  public downloadResults(ctx: StateContext<InterviewStateModel>) {
    const { id } = ctx.getState();
    ctx.dispatch(new SetIsLoadingAction(true));

    return this.service.downloadResults(id).pipe(
      tap((data) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        saveAs(blob, 'CreativeHabits.pdf');
      }),
      tap(() => ctx.dispatch(new SetIsLoadingAction(false)))
    );
  }
}
