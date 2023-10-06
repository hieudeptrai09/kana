import { Component, OnInit } from '@angular/core';
import { Question, Setting } from 'src/app/models/center.model';
import { CenterService } from 'src/app/services/center.service';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss'],
})
export class PlaygroundComponent implements OnInit {
  setting: Setting;
  questionNumber: number = 1;
  question: Question;

  tlAnswer: string;
  successTl: boolean;
  successTn: boolean[] = [];
  isDisabled: boolean = false;
  point: number = 0;
  questionPoint: number;

  constructor(private service: CenterService) {}

  ngOnInit(): void {
    this.setting = this.service.getSetting();
    this.question = this.service.getQuestion(
      this.setting.ques,
      this.setting.ans,
      this.setting.quesType,
      this.setting.noAnswers,
      this.setting.isJsound
    );
    this.questionPoint = this.getMaxPoint();
  }

  private getMaxPoint(): number {
    if (this.setting.quesType === 'tl') {
      if (this.setting.isJsound) return 67;
      return 46;
    } else if (this.setting.quesType === 'c') return 0;
    else return this.setting.noAnswers - 1;
  }

  private getQuestion() {
    setTimeout(() => {
      this.question = this.service.getQuestion(
        this.setting.ques,
        this.setting.ans,
        this.setting.quesType,
        this.setting.noAnswers,
        this.setting.isJsound
      );
      this.successTl = undefined;
      this.successTn = [];
      this.questionPoint = this.getMaxPoint();
      ++this.questionNumber;
      this.isDisabled = false;
      if (this.questionNumber > this.setting.noQuestions) this.savePoint();
    }, 2000);
  }

  submit(answer: number | string) {
    let success = answer === this.question.ans;
    if (typeof answer === 'number') this.successTn[answer] = success;
    else this.successTl = success;
    if (this.setting.isDeducted) {
      if (success) {
        this.isDisabled = true;
        this.point += this.questionPoint;
        this.getQuestion();
      } else --this.questionPoint;
    } else {
      if (success) this.point += this.questionPoint;
      this.isDisabled = true;
      this.getQuestion();
    }
  }

  savePoint() {
    let code = this.service.getCode(
      this.setting.ques,
      this.setting.ans,
      this.setting.quesType,
      this.setting.isDeducted
    );
    let marks = localStorage.getItem(code);
    if (!marks) {
      localStorage.setItem(
        code,
        JSON.stringify([
          {
            point: (this.point / (this.questionNumber - 1)).toFixed(2),
            time: new Date().getTime(),
          },
        ])
      );
    } else {
      let marksParse = JSON.parse(marks);
      marksParse.push({
        point: (this.point / (this.questionNumber - 1)).toFixed(2),
        time: new Date().getTime(),
      });
      marksParse.sort((a, b) => {
        let aMark = Number(a.point);
        let bMark = Number(b.point);
        if (aMark > bMark) return 1;
        if (aMark < bMark) return -1;
        return a.time - b.time;
      });
      marksParse.pop();
      localStorage.setItem(code, JSON.stringify(marksParse));
    }
  }
}
