import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-roll-pay',
  templateUrl: './roll-pay.component.html',
  styleUrls: ['./roll-pay.component.css'],
})
export class RollPayComponent implements OnInit {

  public monthSelected = new Date().getMonth();
  public yearSelected = new Date().getFullYear();
  public months = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ];


  constructor() { }

  ngOnInit() {
  }



  public forwardMonth() {
    if (this.monthSelected === 0) {
      this.monthSelected = 11;
      this.yearSelected = this.yearSelected - 1;
    } else {
      this.monthSelected = this.monthSelected - 1;
    }
  }

  public nextMonth() {
    if (this.monthSelected === 11) {
      this.monthSelected = 0;
      this.yearSelected = this.yearSelected + 1;
    } else {
      this.monthSelected = this.monthSelected + 1;
    }
  }
}
