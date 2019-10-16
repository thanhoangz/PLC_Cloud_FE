import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';
import { ConfirmService } from 'src/app/admin/services/extension/confirm.service';
import { LearnerService } from 'src/app/admin/services/learner.service';
import { GuestTypeService } from 'src/app/admin/services/guest-type.service';

@Component({
  selector: 'app-add-page-learner',
  templateUrl: './add-page-learner.component.html',
  styleUrls: ['./add-page-learner.component.css']
})
export class AddPageLearnerComponent implements OnInit {
  public floatLabel = 'always';
  public showProgressBar = false;
  public guestTypes;
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

  constructor(
    private learnerService: LearnerService,
    private guestTypeService: GuestTypeService,
    public matDialog: MatDialog,
    private notificationService: NotificationService,
    private confirmService: ConfirmService
  ) { }

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

  public startProgressBar() {
    this.showProgressBar = true;
  }

  public stopProgressBar() {
    this.showProgressBar = false;
  }

  public getGuestType() {
    this.startProgressBar();
    this.guestTypeService.getAllGuestTypes().subscribe(result => {
      this.guestTypes = result;
      console.log(result);
      this.stopProgressBar();
    }, error => {
      this.stopProgressBar();
    });
  }

  public changeDate(event) {

  }

  ngOnInit() {
    this.getAllStatus();
    this.getGuestType();
  }

  public createLearner() {

  }
}
