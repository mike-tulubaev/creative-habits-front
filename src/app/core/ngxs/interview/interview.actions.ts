import { InterviewResultModel } from '../../models/interview-result.model';
import { Question } from '../../models/question.model';

export class SetAnswerAction {
  static readonly type = '[Interview] Set answer';
  constructor(public payload: { question: Question; answer: string }) {}
}

export class SetNumberOfQuestionsAction {
  static readonly type = '[Interview] Set number of questions';
  constructor(public numOfQuestions: number) {}
}

export class SetInterviewResultAction {
  static readonly type = '[Interview] Set interview result';
  constructor(public result: InterviewResultModel) {}
}

export class SetShowMissed {
  static readonly type = '[Interview] Set Show Missed';
  constructor(public payload: boolean) {}
}

export class DownloadResults {
  static readonly type = '[Interview] Download Results';
}

export class ClearInterview {
  static readonly type = '[Interview] Clear Interview';
}