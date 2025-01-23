export const letterType = ['katakana', 'hiragana', 'romaji', 'kana'] as const;
export type LetterType = (typeof letterType)[number];
export const questionType = ['tn', 'tl', 'c'] as const;
export type QuestionType = (typeof questionType)[number];
export const limitType = ['âm cơ bản', 'âm đục', 'âm ngắt'] as const;
export type LimitType = (typeof limitType)[number];

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
  point: number;
  time: number;
}
