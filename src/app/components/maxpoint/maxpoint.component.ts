import { Component, OnInit } from '@angular/core';
import {
  LetterType,
  QuestionType,
  TableRecord,
  letterType,
  questionType,
} from 'src/app/models/center.model';
import { CenterService } from 'src/app/services/center.service';

@Component({
  selector: 'app-maxpoint',
  templateUrl: './maxpoint.component.html',
  styleUrls: ['./maxpoint.component.scss'],
})
export class MaxpointComponent implements OnInit {
  question: LetterType = 'hiragana';
  answer: LetterType = 'romaji';
  questionType: QuestionType = 'tn';
  isDeducted: boolean = false;

  questions: LetterType[];
  answers: LetterType[];
  questionTypes: QuestionType[];
  deducted: boolean[] = [true, false];

  table: TableRecord[];
  tablelength: number;

  constructor(private service: CenterService) {
    this.questions = [...letterType];
    this.answers = [...letterType];
    this.questionTypes = [...questionType];
  }

  ngOnInit(): void {}

  inputDirty() {
    this.tablelength = undefined;
  }

  showPoint() {
    let code = this.service.getCode(
      this.question,
      this.answer,
      this.questionType,
      this.isDeducted
    );
    this.table = JSON.parse(localStorage.getItem(code));
    if (this.table === null) this.table = [];
    this.tablelength = this.table.length;
  }
}
