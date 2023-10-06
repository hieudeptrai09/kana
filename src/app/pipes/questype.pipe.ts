import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'questype',
})
export class QuestypePipe implements PipeTransform {
  transform(value: string): string {
    if (value === 'tn') return 'trắc nghiệm';
    if (value === 'tl') return 'tự luận';
    return 'chuỗi';
  }
}
