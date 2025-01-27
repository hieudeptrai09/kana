import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  LetterType,
  LimitType,
  QuestionType,
  letterType,
  limitType,
  questionType,
} from 'src/app/models/center.model';
import { CenterService } from 'src/app/services/center.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  question: LetterType;
  answer: LetterType;
  questionType: QuestionType;
  limit: LimitType;
  choices: number;
  noQuestions: number;
  isDeducted: boolean;

  questions: LetterType[];
  answers: LetterType[];
  questionTypes: QuestionType[];
  limitList: LimitType[];
  choicesNo: number[] = [3, 4, 5, 6, 7, 8, 9, 10];
  noQuestionsPerTurn: number[] = [10, 15, 20, 25, 30];

  message: string = '';

  constructor(private service: CenterService, private modalService: NgbModal) {}

  ngOnInit(): void {
    let setting = this.service.getSetting();
    this.question = setting.ques || 'hiragana';
    this.answer = setting.ans || 'romaji';
    this.questionType = setting.quesType || 'tn';
    this.choices = setting.noAnswers || 4;
    this.noQuestions = setting.noQuestions || 10;
    this.isDeducted = setting.isDeducted || false;
    this.limit = setting.limit || 'âm ngắt';

    this.questions = [...letterType];
    this.answers = [...letterType];
    this.questionTypes = [...questionType];
    this.limitList = [...limitType];
  }

  save(popupTemplate) {
    if (
      this.question === undefined ||
      this.answer === undefined ||
      this.questionType === undefined ||
      (this.questionType === 'tn' && this.choices === undefined) ||
      this.isDeducted === undefined ||
      this.noQuestions === undefined ||
      this.limit === undefined
    ) {
      this.message = 'Cần phải chọn đủ các mục cài đặt';
      this.openPopup(popupTemplate);
      return;
    }

    if (this.question === this.answer) {
      this.message = 'Câu hỏi và câu trả lời cần phải là hai loại khác nhau';
      this.openPopup(popupTemplate);
      return;
    }

    if (this.question === 'kana' && this.answer !== 'romaji') {
      this.message =
        'Chỉ được chọn câu trả lời thuộc loại romaji khi câu hỏi thuộc loại kana';
      this.openPopup(popupTemplate);
      return;
    }

    if (this.answer === 'kana' && this.question !== 'romaji') {
      this.message =
        'Chỉ được chọn câu hỏi thuộc loại romaji khi câu trả lời thuộc loại kana';
      this.openPopup(popupTemplate);
      return;
    }

    if (this.answer === 'kana' && this.questionType === 'tl') {
      this.message =
        'Chỉ được chọn câu hỏi trắc nghiệm khi câu trả lời thuộc loại kana';
      this.openPopup(popupTemplate);
      return;
    }

    if (this.question === 'romaji' && this.questionType === 'c') {
      this.message =
        'Không được chọn câu hỏi thuộc loại romaji ở dạng ghép chuỗi';
      this.openPopup(popupTemplate);
      return;
    }

    this.service.saveSetting({
      ques: this.question,
      ans: this.answer,
      quesType: this.questionType,
      isDeducted: this.isDeducted,
      noQuestions: this.noQuestions,
      noAnswers: this.choices,
      limit: this.limit,
    });

    this.message = 'Đã lưu thành công';
    this.openPopup(popupTemplate);
  }

  private openPopup(popupTemplate) {
    this.modalService.open(popupTemplate, { centered: true });
  }
}
