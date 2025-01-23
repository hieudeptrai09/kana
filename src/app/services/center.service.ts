import { Injectable } from '@angular/core';
import { default as data } from '../../assets/data/data';
import {
  LetterType,
  LimitType,
  Question,
  QuestionType,
  Setting,
} from '../models/center.model';

@Injectable({
  providedIn: 'root',
})
export class CenterService {
  length: number;

  constructor() {}

  private checkDuplicate(
    array: number[],
    value: number,
    index: number,
    answer: number
  ): boolean {
    if (value === answer) return true;
    for (let i = 0; i < index; i++) {
      if (value === array[i]) return true;
    }
    return false;
  }

  getCode(
    ques: LetterType,
    answer: LetterType,
    type: QuestionType,
    isDeducted: boolean
  ): string {
    let result = '';
    switch (ques) {
      case 'hiragana':
        result += 'h';
        break;
      case 'katakana':
        result += 'k';
        break;
      case 'romaji':
        result += 'l';
        break;
      case 'kana':
        result += 'j';
        break;
    }
    switch (answer) {
      case 'hiragana':
        result += 'h';
        break;
      case 'katakana':
        result += 'k';
        break;
      case 'romaji':
        result += 'l';
        break;
      case 'kana':
        result += 'j';
        break;
    }
    switch (type) {
      case 'tn':
        result += 'n';
        break;
      case 'tl':
        result += 'l';
        break;
      case 'c':
        result += 'c';
    }
    if (isDeducted) result += '-';
    else result += '+';
    return result;
  }

  saveSetting(setting: Setting) {
    localStorage.setItem('ques', setting.ques);
    localStorage.setItem('answer', setting.ans);
    localStorage.setItem('quesType', setting.quesType);
    localStorage.setItem('isDeducted', String(setting.isDeducted));
    localStorage.setItem('limit', String(setting.limit));
    localStorage.setItem('noQuestions', String(setting.noQuestions));
    localStorage.setItem('noAnswers', String(setting.noAnswers));
  }

  getSetting(): Setting {
    return {
      ques: localStorage.getItem('ques') as LetterType,
      ans: localStorage.getItem('answer') as LetterType,
      quesType: localStorage.getItem('quesType') as QuestionType,
      limit: localStorage.getItem('limit') as LimitType,
      isDeducted: JSON.parse(localStorage.getItem('isDeducted')),
      noQuestions: Number(localStorage.getItem('noQuestions')),
      noAnswers: Number(localStorage.getItem('noAnswers')),
    };
  }

  haveSet(): boolean {
    let setting = this.getSetting();
    let result =
      Boolean(setting.ans) &&
      setting.isDeducted !== null &&
      Boolean(setting.noAnswers) &&
      Boolean(setting.noQuestions) &&
      Boolean(setting.ques) &&
      Boolean(setting.quesType) &&
      Boolean(setting.limit);
    return result;
  }

  getNoCharacter(limit: LimitType) {
    switch (limit) {
      case 'âm cơ bản':
        return 46;
      case 'âm đục':
        return 69;
      case 'âm ngắt':
        return 134;
    }
  }

  getQuestion(
    question: LetterType,
    answer: LetterType,
    type: QuestionType,
    limit: LimitType,
    noAnswer?: number
  ): Question {
    this.length = this.getNoCharacter(limit);
    if (type === 'tl') {
      if (question === 'kana') {
        let choice = Math.floor(Math.random() * this.length);
        let isHiragana = Math.floor(Math.random());
        return {
          ques: isHiragana ? data[choice].hiragana : data[choice].katakana,
          ans: data[choice].romaji,
        };
      } else {
        let choice = Math.floor(Math.random() * this.length);
        return {
          ques: data[choice][question],
          ans: data[choice][answer],
        };
      }
    } else if (type === 'c') {
      let noChars = Math.floor(Math.random() * 7) + 4;
      let ques = '';
      let ans = '';
      if (question === 'kana') {
        for (let i = 0; i < noChars; i++) {
          let choice = Math.floor(Math.random() * this.length);
          let isHiragana = Math.floor(Math.random());
          ques += isHiragana ? data[choice].hiragana : data[choice].katakana;
          ans += data[choice].romaji;
        }
      } else {
        for (let i = 0; i < noChars; i++) {
          let choice = Math.floor(Math.random() * this.length);
          ques += data[choice][question];
          ans += data[choice][answer];
        }
      }
      return {
        ques,
        ans,
      };
    } else {
      if (question === 'kana') {
        let choice = Math.floor(Math.random() * this.length);
        let ans = Math.floor(Math.random() * noAnswer);
        let isHiragana = Math.floor(Math.random());
        let choices: string[] = [];
        let choicesNo: number[] = [];

        choicesNo[ans] = choice;

        for (let i = 0; i < noAnswer; i++) {
          if (i !== ans) {
            do {
              choicesNo[i] = Math.floor(Math.random() * this.length);
            } while (this.checkDuplicate(choicesNo, choicesNo[i], i, ans));
          }
        }
        for (let i = 0; i < noAnswer; i++)
          choices[i] = data[choicesNo[i]].romaji;

        return {
          ques: isHiragana ? data[choice].hiragana : data[choice].katakana,
          ans: ans,
          choices: choices,
        };
      } else if (answer === 'kana') {
        let choice = Math.floor(Math.random() * this.length);
        let ans = Math.floor(Math.random() * noAnswer);
        let choices: string[] = [];
        let choicesNo: number[] = [];

        choicesNo[ans] = choice;

        for (let i = 0; i < noAnswer; i++) {
          if (i !== ans) {
            do {
              choicesNo[i] = Math.floor(Math.random() * this.length);
            } while (this.checkDuplicate(choicesNo, choicesNo[i], i, ans));
          }
        }
        for (let i = 0; i < noAnswer; i++) {
          let isHiragana = Math.floor(Math.random());
          choices[i] = isHiragana
            ? data[choicesNo[i]].hiragana
            : data[choicesNo[i]].katakana;
        }
        return {
          ques: data[choice].romaji,
          ans: ans,
          choices: choices,
        };
      } else {
        let choice = Math.floor(Math.random() * this.length);
        let ans = Math.floor(Math.random() * noAnswer);
        let choices: string[] = [];
        let choicesNo: number[] = [];

        choicesNo[ans] = choice;

        for (let i = 0; i < noAnswer; i++) {
          if (i !== ans) {
            do {
              choicesNo[i] = Math.floor(Math.random() * this.length);
            } while (this.checkDuplicate(choicesNo, choicesNo[i], i, ans));
          }
        }
        for (let i = 0; i < noAnswer; i++)
          choices[i] = data[choicesNo[i]][answer];
        return {
          ques: data[choice][question],
          ans: ans,
          choices: choices,
        };
      }
    }
  }
}
