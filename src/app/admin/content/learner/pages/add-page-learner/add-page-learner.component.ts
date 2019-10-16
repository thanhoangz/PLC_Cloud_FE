import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-page-learner',
  templateUrl: './add-page-learner.component.html',
  styleUrls: ['./add-page-learner.component.css']
})
export class AddPageLearnerComponent implements OnInit {
  public floatLabel = 'always';

  public guestType;
  public learner = {
    id: null,
    cardId: null,
    firstName: null,
    lastName: null,
    sex: null,
    birthday: null,
    address: null,
    email: null,
    facebook: null,
    phone: null,
    parentFullName: null,
    parentPhone: null,
    image: null,
    status: 1,
    note: null,
    dateCreated: null,
    dateModified: null,
    guestTypeId: null
  };

  public genderes = [
    {
      name: 'Nam',
      value: true
    },
    {
      name: 'Nữ',
      value: false
    }
  ];

  public status;

  constructor() { }

  private getAllStatus() {
    this.status = [
      {
        name: 'Hoạt động',
        code: 1
      },
      {
        name: 'Khóa',
        code: 0
      },
      {
        name: 'Tất cả',
        code: 2
      }];
  }

  public changeDate(event) {

  }

  ngOnInit() {
    this.getAllStatus();
  }

}
