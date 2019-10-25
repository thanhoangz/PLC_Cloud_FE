import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {
  private subject = new Subject<any>();

  constructor() {
  }
  confirmThis(message: string, siFn: () => void, noFn: () => void) {
    this.setConfirmation(message, siFn, noFn);

  }
  setConfirmation(message: string, siFn: () => void, noFn: () => void) {
    // tslint:disable-next-line: prefer-const
    let that = this;
    this.subject.next({
      // tslint:disable-next-line: quotemark
      type: "confirm",
      text: message,
      // tslint:disable-next-line: object-literal-shorthand
      siFn:
        // tslint:disable-next-line: only-arrow-functions
        function() {
          that.subject.next(); // this will close the modal
          siFn();
        },
      // tslint:disable-next-line: only-arrow-functions
      // tslint:disable-next-line: object-literal-shorthand
      noFn: function() {
        that.subject.next();
        noFn();
      }
    });
  }
  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
