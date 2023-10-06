import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CenterService } from '../services/center.service';

@Injectable({
  providedIn: 'root',
})
export class PlaygroundGuard implements CanActivate {
  constructor(private centerService: CenterService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let setting = this.centerService.getSetting();
    return (
      Boolean(setting.ans) &&
      setting.isDeducted !== null &&
      Boolean(setting.noAnswers) &&
      Boolean(setting.noQuestions) &&
      Boolean(setting.ques) &&
      Boolean(setting.quesType)
    );
  }
}
