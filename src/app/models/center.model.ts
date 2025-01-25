export const letterType = ['katakana', 'hiragana', 'romaji', 'kana'] as const;
export type LetterType = (typeof letterType)[number];
export const questionType = ['tn', 'tl', 'c'] as const;
export type QuestionType = (typeof questionType)[number];
export const limitType = ['âm cơ bản', 'âm đục', 'âm ghép', 'âm ngắt'] as const;
export type LimitType = (typeof limitType)[number];

export const BASIC_LENGTH = 46;
export const CONVOWEL_LENGTH = 71;
export const PALATALIZED_LENGTH = 107;
export const EXHAUSTED_LENGTH = 139;
export const N_INDEX = 45;

export interface Question {
  ques: string;
  ans: string | number;
  choices?: string[];
}

export interface Setting {
  ques: LetterType;
  ans: LetterType;
  quesType: QuestionType;
  limit: LimitType;
  isDeducted: boolean;
  noQuestions: number;
  noAnswers?: number;
}

export interface TableRecord {
  point: string;
  time: number;
}
