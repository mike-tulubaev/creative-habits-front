import { InterviewResultModel } from "./interview-result.model";

export interface InterviewStateModel {
  id: string;
  progress: number;
  numOfQuestions: number;
  showMissed: boolean;
  answers: { [question: string]: string };
  result: InterviewResultModel | null;
}
