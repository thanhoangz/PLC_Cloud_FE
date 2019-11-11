import { element } from 'protractor';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-roll-pay',
  templateUrl: './roll-pay.component.html',
  styleUrls: ['./roll-pay.component.css'],
})
export class RollPayComponent implements OnInit {

  public monthSelected = new Date().getMonth();
  public yearSelected = new Date().getFullYear();
  public tabSelected;
  public months = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ];

  public overviewRollPay = {
    totalOfMonth: 30,
    totalOfStaffs: 20,
    totalOfLecturers: 10,
    totalSalaries: 30000000,
  };
  public rollPay;
  rollPayColumns: string[] = ['index', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(this.rollPay);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor() { }

  ngOnInit() {
    this.tabSelected = this.monthSelected;
  }

  public changeTab(e) {
    console.log(e);
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
