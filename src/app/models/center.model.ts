export const letterType = ['katakana', 'hiragana', 'latin', 'kana'] as const;
export type LetterType = (typeof letterType)[number];
export const questionType = ['tn', 'tl', 'c'] as const;
export type QuestionType = (typeof questionType)[number];

export interface Question {
  ques: string;
  ans: string | number;
  choices?: string[];
}

export interface Setting {
  ques: LetterType;
  ans: LetterType;
  quesType: QuestionType;
  isDeducted: boolean;
  isJsound: boolean;
  noQuestions: number;
  noAnswers?: number;
}

export interface TableRecord {
  point: number;
  time: number;
}
