import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CenterService } from '../services/center.service';

@Injectable({
  providedIn: 'root',
})
export class PlaygroundGuard implements CanActivate {
  constructor(private service: CenterService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let result = this.service.haveSet();
    if (!result) {
      this.service.saveSetting({
        ques: 'hiragana',
        ans: 'romaji',
        quesType: 'tn',
        noQuestions: 10,
        noAnswers: 4,
        isDeducted: false,
        limit: 'âm cơ bản',
      });
    }
    return true;
  }
}
