import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-learner',
  templateUrl: './add-learner.component.html',
  styleUrls: ['./add-learner.component.css']
})
export class AddLearnerComponent implements OnInit {

  public studyprocess = {
    LanguageClassId: null,
  };
  public languageClass;

  public status = [];
  public statusSelected;
  constructor() { }

  ngOnInit() {
  }

  public getAllStatus() {
    this.status = [
      {
        name: 'Đang học',
        code: 1
      },
      {
        name: 'Đã chuyển lớp',
        code: 2
      },
      {
        name: 'Đã nghỉ',
        code: 0
      },
      {
        name: 'Tạm nghỉ',
        code: 3
      },
      {
        name: 'Tất cả',
        code: 4
      }
    ];
  }
}
