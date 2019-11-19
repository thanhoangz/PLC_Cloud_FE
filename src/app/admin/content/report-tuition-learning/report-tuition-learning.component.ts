import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-tuition-learning',
  templateUrl: './report-tuition-learning.component.html',
  styleUrls: ['./report-tuition-learning.component.css']
})
export class ReportTuitionLearningComponent implements OnInit {
  public months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  public years = [];

    // để chuyển tháng năm and gán dữ liệu lên lable
    public monthSelected = (new Date().getMonth() + 1).toString();
    public yearSelected = new Date().getFullYear().toString();
  constructor() { }

  ngOnInit() {
    this.getAllYear();
  }

    // Lấy năm
    public getAllYear() {
      for (let i = 2017; i <= 2999; i++) {
        this.years.push(i);
      }
    }

}
