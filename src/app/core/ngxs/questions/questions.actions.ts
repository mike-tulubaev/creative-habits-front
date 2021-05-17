import { Question } from '../../models/question.model';

export class SetQuestionsAction {
  static readonly type = '[Questions] Set question list';
  constructor(public questions: Question[]) {}
}
