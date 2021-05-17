import { Injectable } from '@angular/core';
import { Action, State, StateContext, StateToken } from '@ngxs/store';
import { Question, QuestionTypeEnum } from '../../models/question.model';
import { SetNumberOfQuestionsAction } from '../interview/interview.actions';
import { SetQuestionsAction } from './questions.actions';

const QUESTION_TOKEN: StateToken<Question[]> = new StateToken('questions');

@State<Question[]>({
  name: QUESTION_TOKEN,
  defaults: [],
})
@Injectable()
export class QuestionsState {
  @Action(SetQuestionsAction)
  public setQuestions(
    ctx: StateContext<Question[]>,
    action: SetQuestionsAction
  ) {
    const questionList = action.questions.filter(
      (q) =>
        q.type === QuestionTypeEnum.ONE_TO_FIVE ||
        q.type === QuestionTypeEnum.PICK_ONE ||
        q.type === QuestionTypeEnum.PICK_ONE_FIVE
    );
    ctx.setState(questionList);
    ctx.dispatch(new SetNumberOfQuestionsAction(questionList.length));
  }
}
