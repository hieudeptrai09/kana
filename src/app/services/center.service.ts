import { Injectable } from '@angular/core';
import { default as data } from '../../assets/data/data';
import {
  LetterType,
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
    index: number
  ): boolean {
    for (let i = 0; i < array.length; i++) {
      if (i === index) continue;
      if (value === array[i] || value === array[i] - this.length) return true;
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
      case 'latin':
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
      case 'latin':
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
    localStorage.setItem('isJsound', String(setting.isJsound));
    localStorage.setItem('noQuestions', String(setting.noQuestions));
    localStorage.setItem('noAnswers', String(setting.noAnswers));
  }

  getSetting(): Setting {
    return {
      ques: localStorage.getItem('ques') as LetterType,
      ans: localStorage.getItem('answer') as LetterType,
      quesType: localStorage.getItem('quesType') as QuestionType,
      isDeducted: JSON.parse(localStorage.getItem('isDeducted')),
      isJsound: JSON.parse(localStorage.getItem('isJsound')),
      noQuestions: Number(localStorage.getItem('noQuestions')),
      noAnswers: Number(localStorage.getItem('noAnswers')),
    };
  }

  getQuestion(
    question: LetterType,
    answer: LetterType,
    type: QuestionType,
    noAnswer?: number,
    isJsound?: boolean
  ): Question {
    this.length =
      type === 'c'
        ? data.hiraganaChain.length
        : isJsound
        ? data.hiraganaJsound.length
        : data.hiragana.length;
    if (type === 'tl') {
      if (question === 'kana') {
        let choice = Math.floor(Math.random() * 2 * this.length);
        if (choice < this.length) {
          return {
            ques: data['hiragana' + (isJsound ? 'Jsound' : '')][choice],
            ans: data['latin' + (isJsound ? 'Jsound' : '')][choice],
          };
        }
        return {
          ques: data['katakana' + (isJsound ? 'Jsound' : '')][
            choice - this.length
          ],
          ans: data['latin' + (isJsound ? 'Jsound' : '')][choice - this.length],
        };
      } else {
        let choice = Math.floor(Math.random() * this.length);
        return {
          ques: data[question + (isJsound ? 'Jsound' : '')][choice],
          ans: data[answer + (isJsound ? 'Jsound' : '')][choice],
        };
      }
    } else if (type === 'c') {
      let noChars = Math.floor(Math.random() * 7) + 4;
      let ques = '';
      let ans = '';
      for (let i = 0; i < noChars; i++) {
        if (question === 'kana') {
          let choice = Math.floor(Math.random() * 2 * this.length);
          if (choice < this.length) {
            ques += data.hiraganaChain[choice];
            ans += data.latinChain[choice];
          } else {
            ques += data.katakanaChain[choice - this.length];
            ans += data.latinChain[choice - this.length];
          }
        } else {
          let choice = Math.floor(Math.random() * this.length);
          ques += data[question + 'Chain'][choice];
          ans += data[answer + 'Chain'][choice];
        }
      }
      return {
        ques,
        ans,
      };
    } else {
      if (question === 'kana') {
        let choice = Math.floor(Math.random() * 2 * this.length);
        let ans = Math.floor(Math.random() * noAnswer);
        let choices = [];
        let choicesNo = [];

        if (choice < this.length) choicesNo[ans] = choice;
        else choicesNo[ans] = choice - this.length;

        for (let i = 0; i < noAnswer; i++) {
          if (i !== ans) {
            do {
              choicesNo[i] = Math.floor(Math.random() * this.length);
            } while (this.checkDuplicate(choicesNo, choicesNo[i], i));
          }
        }
        for (let i = 0; i < noAnswer; i++)
          choices[i] = data['latin' + (isJsound ? 'Jsound' : '')][choicesNo[i]];
        if (choice < this.length) {
          return {
            ques: data['hiragana' + (isJsound ? 'Jsound' : '')][choice],
            ans: ans,
            choices: choices,
          };
        }
        return {
          ques: data['katakana' + (isJsound ? 'Jsound' : '')][
            choice - this.length
          ],
          ans: ans,
          choices: choices,
        };
      } else if (answer === 'kana') {
        let choice = Math.floor(Math.random() * this.length);
        let ans = Math.floor(Math.random() * noAnswer);
        let choices = [];
        let choicesNo = [];

        choicesNo[ans] = choice + Math.floor(Math.random() * 2) * this.length;

        for (let i = 0; i < noAnswer; i++) {
          if (i !== ans) {
            do {
              choicesNo[i] = Math.floor(Math.random() * 2 * this.length);
            } while (this.checkDuplicate(choicesNo, choicesNo[i], i));
          }
        }
        for (let i = 0; i < noAnswer; i++) {
          if (choicesNo[i] < this.length)
            choices[i] =
              data['hiragana' + (isJsound ? 'Jsound' : '')][choicesNo[i]];
          else
            choices[i] =
              data['katakana' + (isJsound ? 'Jsound' : '')][
                choicesNo[i] - this.length
              ];
        }
        return {
          ques: data['latin' + (isJsound ? 'Jsound' : '')][choice],
          ans: ans,
          choices: choices,
        };
      } else {
        let choice = Math.floor(Math.random() * this.length);
        let ans = Math.floor(Math.random() * noAnswer);
        let choices = [];
        let choicesNo = [];

        choicesNo[ans] = choice;

        for (let i = 0; i < noAnswer; i++) {
          if (i !== ans) {
            do {
              choicesNo[i] = Math.floor(Math.random() * this.length);
            } while (this.checkDuplicate(choicesNo, choicesNo[i], i));
          }
        }
        for (let i = 0; i < noAnswer; i++)
          choices[i] = data[answer + (isJsound ? 'Jsound' : '')][choicesNo[i]];
        return {
          ques: data[question + (isJsound ? 'Jsound' : '')][choice],
          ans: ans,
          choices: choices,
        };
      }
    }
  }
}
