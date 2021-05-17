export enum QuestionTypeEnum {
  ONE_TO_FIVE = 'one-to-five',
  PICK_ONE_FIVE = 'pick-one-5',
  PICK_ONE = 'pick-one',
  TEXT = 'text',
}

export class Question {
  type: QuestionTypeEnum | undefined;
  text: string = '';
}

export class PickQuestion extends Question {
  answers: string[] = [];
}

export class TextQuestion extends Question {
  optional: boolean = true;
}
